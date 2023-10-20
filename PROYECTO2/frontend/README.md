# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Prueba Docker-Local

* Creando imagen:

```
sudo docker build -t gudiel/so1-py2-front:1.0.0 .
```

* Run:
    * Las credenciales son de dbs local.
    * 172.17.0.6 es la IP del contenedor de Node.

```
sudo docker run --rm -it -p 5173:80 -d \
-e VITE_IP_NODE=172.17.0.6 \
gudiel/so1-py2-front:1.0.0
```
