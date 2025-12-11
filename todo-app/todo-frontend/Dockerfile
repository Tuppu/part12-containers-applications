# ---------- Test stage ----------
FROM node:20 AS test

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Aja testit. Jos failaa, koko build epäonnistuu.
RUN npm test -- --run


# ---------- Production stage ----------
FROM node:20 AS prod

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Backend on hostilla portissa 3000, kontista katsottuna:
ENV VITE_BACKEND_URL=http://host.docker.internal:3000

# RAKENNETAAN tuotantoversio
RUN npm run build

# Ajetaan buildattu appi Viten preview-serverillä
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]