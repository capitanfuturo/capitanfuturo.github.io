#!/bin/sh
npm ci
npm run dev -- --host 0.0.0.0 --port 4321
