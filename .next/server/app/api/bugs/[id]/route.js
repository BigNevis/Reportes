"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/bugs/[id]/route";
exports.ids = ["app/api/bugs/[id]/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbugs%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbugs%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/node-polyfill-headers */ \"(rsc)/./node_modules/next/dist/server/node-polyfill-headers.js\");\n/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var C_Users_feder_source_repos_Reportes_app_api_bugs_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/bugs/[id]/route.ts */ \"(rsc)/./app/api/bugs/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_1__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_2__.RouteKind.APP_ROUTE,\n        page: \"/api/bugs/[id]/route\",\n        pathname: \"/api/bugs/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/bugs/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\feder\\\\source\\\\repos\\\\Reportes\\\\app\\\\api\\\\bugs\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_feder_source_repos_Reportes_app_api_bugs_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/bugs/[id]/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZidWdzJTJGJTVCaWQlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmJ1Z3MlMkYlNUJpZCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmJ1Z3MlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNmZWRlciU1Q3NvdXJjZSU1Q3JlcG9zJTVDUmVwb3J0ZXMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2ZlZGVyJTVDc291cmNlJTVDcmVwb3MlNUNSZXBvcnRlcyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUNzRDtBQUN2QztBQUN1QztBQUN0RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNpSjs7QUFFakoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXBvcnRlcy8/YWUwNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJuZXh0L2Rpc3Qvc2VydmVyL25vZGUtcG9seWZpbGwtaGVhZGVyc1wiO1xuaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcZmVkZXJcXFxcc291cmNlXFxcXHJlcG9zXFxcXFJlcG9ydGVzXFxcXGFwcFxcXFxhcGlcXFxcYnVnc1xcXFxbaWRdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9idWdzL1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9idWdzL1tpZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2J1Z3MvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGZlZGVyXFxcXHNvdXJjZVxcXFxyZXBvc1xcXFxSZXBvcnRlc1xcXFxhcHBcXFxcYXBpXFxcXGJ1Z3NcXFxcW2lkXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9idWdzL1tpZF0vcm91dGVcIjtcbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbugs%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/bugs/[id]/route.ts":
/*!************************************!*\
  !*** ./app/api/bugs/[id]/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_1__.Pool({\n    connectionString: process.env.POSTGRES_URL\n});\nasync function PUT(request, { params }) {\n    const { id } = params;\n    const { prioridad, comentarios, estimacion, comentarios_qa } = await request.json();\n    const client = await pool.connect();\n    try {\n        // Primero, verificamos si la clave existe\n        const checkResult = await client.query(\"SELECT * FROM Issues_Data WHERE clave = $1\", [\n            id\n        ]);\n        let result;\n        if (checkResult.rows.length === 0) {\n            // Si no existe, creamos un nuevo registro\n            result = await client.query(`INSERT INTO Issues_Data (clave, prioridad, comentarios, estimacion, comentarios_qa)\r\n         VALUES ($1, $2, $3, $4, $5)\r\n         RETURNING *`, [\n                id,\n                prioridad,\n                comentarios,\n                estimacion,\n                comentarios_qa\n            ]);\n        } else {\n            // Si existe, actualizamos el registro\n            result = await client.query(`UPDATE Issues_Data\r\n         SET \r\n           prioridad = $2,\r\n           comentarios = $3,\r\n           estimacion = $4,\r\n           comentarios_qa = $5\r\n         WHERE clave = $1\r\n         RETURNING *`, [\n                id,\n                prioridad,\n                comentarios,\n                estimacion,\n                comentarios_qa\n            ]);\n        }\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(result.rows[0]);\n    } catch (error) {\n        console.error(\"Error al actualizar/crear bug:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Error al actualizar/crear bug\"\n        }, {\n            status: 500\n        });\n    } finally{\n        client.release();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2J1Z3MvW2lkXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJDO0FBQ2pCO0FBRTFCLE1BQU1FLE9BQU8sSUFBSUQsb0NBQUlBLENBQUM7SUFDcEJFLGtCQUFrQkMsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0FBQzVDO0FBRU8sZUFBZUMsSUFBSUMsT0FBZ0IsRUFBRSxFQUFFQyxNQUFNLEVBQThCO0lBQ2hGLE1BQU0sRUFBRUMsRUFBRSxFQUFFLEdBQUdEO0lBQ2YsTUFBTSxFQUFFRSxTQUFTLEVBQUVDLFdBQVcsRUFBRUMsVUFBVSxFQUFFQyxjQUFjLEVBQUUsR0FBRyxNQUFNTixRQUFRTyxJQUFJO0lBRWpGLE1BQU1DLFNBQVMsTUFBTWQsS0FBS2UsT0FBTztJQUVqQyxJQUFJO1FBQ0YsMENBQTBDO1FBQzFDLE1BQU1DLGNBQWMsTUFBTUYsT0FBT0csS0FBSyxDQUNwQyw4Q0FDQTtZQUFDVDtTQUFHO1FBR04sSUFBSVU7UUFDSixJQUFJRixZQUFZRyxJQUFJLENBQUNDLE1BQU0sS0FBSyxHQUFHO1lBQ2pDLDBDQUEwQztZQUMxQ0YsU0FBUyxNQUFNSixPQUFPRyxLQUFLLENBQ3pCLENBQUM7O29CQUVXLENBQUMsRUFDYjtnQkFBQ1Q7Z0JBQUlDO2dCQUFXQztnQkFBYUM7Z0JBQVlDO2FBQWU7UUFFNUQsT0FBTztZQUNMLHNDQUFzQztZQUN0Q00sU0FBUyxNQUFNSixPQUFPRyxLQUFLLENBQ3pCLENBQUM7Ozs7Ozs7b0JBT1csQ0FBQyxFQUNiO2dCQUFDVDtnQkFBSUM7Z0JBQVdDO2dCQUFhQztnQkFBWUM7YUFBZTtRQUU1RDtRQUVBLE9BQU9kLGtGQUFZQSxDQUFDZSxJQUFJLENBQUNLLE9BQU9DLElBQUksQ0FBQyxFQUFFO0lBQ3pDLEVBQUUsT0FBT0UsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsa0NBQWtDQTtRQUNoRCxPQUFPdkIsa0ZBQVlBLENBQUNlLElBQUksQ0FBQztZQUFFUSxPQUFPO1FBQWdDLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQ3JGLFNBQVU7UUFDUlQsT0FBT1UsT0FBTztJQUNoQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVwb3J0ZXMvLi9hcHAvYXBpL2J1Z3MvW2lkXS9yb3V0ZS50cz80OTlkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcclxuXHJcbmNvbnN0IHBvb2wgPSBuZXcgUG9vbCh7XHJcbiAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMXHJcbn0pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVChyZXF1ZXN0OiBSZXF1ZXN0LCB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBpZDogc3RyaW5nIH0gfSkge1xyXG4gIGNvbnN0IHsgaWQgfSA9IHBhcmFtcztcclxuICBjb25zdCB7IHByaW9yaWRhZCwgY29tZW50YXJpb3MsIGVzdGltYWNpb24sIGNvbWVudGFyaW9zX3FhIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBQcmltZXJvLCB2ZXJpZmljYW1vcyBzaSBsYSBjbGF2ZSBleGlzdGVcclxuICAgIGNvbnN0IGNoZWNrUmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFxyXG4gICAgICAnU0VMRUNUICogRlJPTSBJc3N1ZXNfRGF0YSBXSEVSRSBjbGF2ZSA9ICQxJyxcclxuICAgICAgW2lkXVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgaWYgKGNoZWNrUmVzdWx0LnJvd3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIC8vIFNpIG5vIGV4aXN0ZSwgY3JlYW1vcyB1biBudWV2byByZWdpc3Ryb1xyXG4gICAgICByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkoXHJcbiAgICAgICAgYElOU0VSVCBJTlRPIElzc3Vlc19EYXRhIChjbGF2ZSwgcHJpb3JpZGFkLCBjb21lbnRhcmlvcywgZXN0aW1hY2lvbiwgY29tZW50YXJpb3NfcWEpXHJcbiAgICAgICAgIFZBTFVFUyAoJDEsICQyLCAkMywgJDQsICQ1KVxyXG4gICAgICAgICBSRVRVUk5JTkcgKmAsXHJcbiAgICAgICAgW2lkLCBwcmlvcmlkYWQsIGNvbWVudGFyaW9zLCBlc3RpbWFjaW9uLCBjb21lbnRhcmlvc19xYV1cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNpIGV4aXN0ZSwgYWN0dWFsaXphbW9zIGVsIHJlZ2lzdHJvXHJcbiAgICAgIHJlc3VsdCA9IGF3YWl0IGNsaWVudC5xdWVyeShcclxuICAgICAgICBgVVBEQVRFIElzc3Vlc19EYXRhXHJcbiAgICAgICAgIFNFVCBcclxuICAgICAgICAgICBwcmlvcmlkYWQgPSAkMixcclxuICAgICAgICAgICBjb21lbnRhcmlvcyA9ICQzLFxyXG4gICAgICAgICAgIGVzdGltYWNpb24gPSAkNCxcclxuICAgICAgICAgICBjb21lbnRhcmlvc19xYSA9ICQ1XHJcbiAgICAgICAgIFdIRVJFIGNsYXZlID0gJDFcclxuICAgICAgICAgUkVUVVJOSU5HICpgLFxyXG4gICAgICAgIFtpZCwgcHJpb3JpZGFkLCBjb21lbnRhcmlvcywgZXN0aW1hY2lvbiwgY29tZW50YXJpb3NfcWFdXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdC5yb3dzWzBdKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgYWN0dWFsaXphci9jcmVhciBidWc6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJvciBhbCBhY3R1YWxpemFyL2NyZWFyIGJ1ZycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgY2xpZW50LnJlbGVhc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQb29sIiwicG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiUE9TVEdSRVNfVVJMIiwiUFVUIiwicmVxdWVzdCIsInBhcmFtcyIsImlkIiwicHJpb3JpZGFkIiwiY29tZW50YXJpb3MiLCJlc3RpbWFjaW9uIiwiY29tZW50YXJpb3NfcWEiLCJqc29uIiwiY2xpZW50IiwiY29ubmVjdCIsImNoZWNrUmVzdWx0IiwicXVlcnkiLCJyZXN1bHQiLCJyb3dzIiwibGVuZ3RoIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIiwicmVsZWFzZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/bugs/[id]/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbugs%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbugs%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfeder%5Csource%5Crepos%5CReportes&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();