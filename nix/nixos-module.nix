{ config, lib, pkgs, ... }:

let
  cfg = config.services.pdfrang;
in
{
  options.services.pdfrang = {
    enable = lib.mkEnableOption "pdfrang - Professional PDF Tools";

    package = lib.mkOption {
      type = lib.types.package;
      default = pkgs.pdfrang;
      defaultText = lib.literalExpression "pkgs.pdfrang";
      description = "The pdfrang package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to listen on.";
    };

    openFirewall = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Whether to open the firewall port.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        pdfrang = final.callPackage ./package.nix { };
      })
    ];

    systemd.services.pdfrang = {
      description = "pdfrang PDF Tools";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      environment = {
        pdfrang_PORT = toString cfg.port;
      };

      serviceConfig = {
        ExecStart = "${cfg.package}/bin/pdfrang";
        Restart = "on-failure";
        DynamicUser = true;
        RuntimeDirectory = "pdfrang";
        StateDirectory = "pdfrang";

        # Hardening
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        PrivateTmp = true;
        PrivateDevices = true;
        ProtectKernelTunables = true;
        ProtectKernelModules = true;
        ProtectControlGroups = true;
        RestrictSUIDSGID = true;
        MemoryDenyWriteExecute = false;
      };
    };

    networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];
  };
}
