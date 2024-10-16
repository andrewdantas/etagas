/**
 * Service Worker
 * @author Andrew Dantas
 */

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log("Instalando o ServiceWorker...", event)
    // Pré Carregamento em Cache
    event.waitUntil(
        // Armazenar em Cache:
        caches.open('static')
        .then((cache) => {
            console.log("Pré Carregamento dos Arquivos do APP")
            cache.add('/etagas')
            cache.add('/etagas/index.html')
            cache.add('/etagas/style.css')
            cache.add('/etagas/app.js')
            cache.add('/etagas/img/flex.png')
            cache.add('/etagas/img/calcflex.png')
            cache.add('/etagas/img/etanol.png')
            cache.add('/etagas/img/gasolina.png')
        })
    )
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log("Ativando o ServiceWorker...", event)
    return self.clients.claim() // Garantir o Serviço em Todos os Documentos do APP
})

// Escutando Requisições e "buscando algo"
self.addEventListener('fetch', (event) => {
    // console.log("Bucando Algo...", event)
    // Armazenar em Cache (arquivos estáticos pré carregados) Todas as Requisições
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response
            } else {
                return fetch(event.request)
            }
        })
    ) 
})