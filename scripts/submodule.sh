#!/usr/bin/env bash

LIB="mui"
VERSION="4"

optspec=":hv-:"

while getopts "$optspec" optchar; do
    case "${optchar}" in
        -)
            case "${OPTARG}" in
                lib=*)
                    LIB=${OPTARG#*=}
                    ;;
                version=*)
                    VERSION=${OPTARG#*=}
                    ;;
                *)
                    if [ "$OPTERR" = 1 ] && [ "${optspec:0:1}" != ":" ]; then
                        echo ie "${YELLOW}Unknown option3 --${OPTARG}" >&2
                    fi
                    ;;
            esac;;
        *)
            if [ "$OPTERR" != 1 ] || [ "${optspec:0:1}" = ":" ]; then
                echo -e "${YELLOW}Non-option argument: '-${OPTARG}'" >&2
            fi
            ;;
    esac
done

if [ -d common ];
then
    cd common && yarn && cd ..
fi;

if [ -d "$LIB-v$VERSION" ];
then
    echo "$LIB-v$VERSION" && cd "$LIB-v$VERSION" && yarn && cd ..
fi;