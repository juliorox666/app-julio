<template>
    <nav class="navbar navbar-expand-lg navbar-light nav-principal">
        <div class="container d-flex justify-content-between">
            <a class="navbar-brand" href="http://institucional.blueticket.com.br/" target="_blank">Blueticket</a>
            <button class="navbar-toggler justify-content-start" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link class="nav-link logout innav" to="/logout">Sair</router-link>
                    </li>
                </ul>
            </div>
            <router-link class="nav-link justify-content-end logout outnav" to="/logout">Sair</router-link>
        </div>
    </nav>
</template>
