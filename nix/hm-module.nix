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
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        pdfrang = final.callPackage ./package.nix { };
      })
    ];

    systemd.user.services.pdfrang = {
      Unit = {
        Description = "pdfrang PDF Tools";
        After = [ "network.target" ];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/pdfrang";
        Restart = "on-failure";
        Environment = [
          "pdfrang_PORT=${toString cfg.port}"
        ];
      };

      Install = {
        WantedBy = [ "default.target" ];
      };
    };
  };
}
