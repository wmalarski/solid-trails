#!/bin/bash
find ./src/ui -type f -exec sed -i 's/from "styled/from "~\/styled/gI' {} \;