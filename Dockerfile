FROM denoland/deno:latest

WORKDIR /app

# Copy manifests first so the dependency install layer caches across
# source-only edits
COPY deno.json deno.lock  ./
RUN deno ci --prod --skip-types

# Then copy the rest of the source
COPY . .

RUN deno run build

CMD ["deno", "run", "start", "main.ts"]
