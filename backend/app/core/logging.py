import logging
from logging.config import dictConfig


def configure_logging(log_level: str) -> None:
    # Keep logging configuration code-driven for now; this is easier to version,
    # test, and extend than scattering logger setup across modules.
    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "standard": {
                    "format": "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
                }
            },
            "handlers": {
                "default": {
                    "class": "logging.StreamHandler",
                    "formatter": "standard",
                }
            },
            "root": {
                "level": log_level.upper(),
                "handlers": ["default"],
            },
        }
    )

    # Route warnings through the logging pipeline so dependency/runtime warnings
    # land in the same sinks as application logs.
    logging.captureWarnings(True)
