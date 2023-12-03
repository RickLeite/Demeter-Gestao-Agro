package com.demeter.gestaoagro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/cadastro-cliente")
    public String cadastroCliente() {
        return "cadastro-cliente";
    }

    @GetMapping("/cadastro-feedback")
    public String cadastroFeedback() {
        return "cadastroFeedback";
    }

    @GetMapping("/cadastro-vendas")
    public String cadastroVendas() {
        return "cadastro-vendas";
    }

    @GetMapping("/estoque")
    public String estoque() {
        return "estoque";
    }

    @GetMapping("/financeiro")
    public String financeiro() {
        return "financeiro";
    }

    @GetMapping("/grafico")
    public String grafico() {
        return "grafico";
    }

    @GetMapping("/historico-vendas")
    public String historicoVendas() {
        return "historicoDeVendas";
    }

    @GetMapping("/lista-clientes")
    public String listaClientes() {
        return "listaClientes";
    }

    @GetMapping("/lista-produtos")
    public String listaProdutos() {
        return "listaProdutos";
    }

    @GetMapping("/lucros-gastos")
    public String lucrosGastos() {
        return "lucrosGastos";
    }

    @GetMapping("/nossos-produtos")
    public String nossosProdutos() {
        return "nossosProdutos";
    }

    @GetMapping("/registro")
    public String registro() {
        return "registro";
    }

    @GetMapping("/pagina-de-login")
    public String login() {
        return "login";
    }
    
    @GetMapping("/perfil")
    public String perfil() {
        return "perfil"; // O nome 'perfil' deve corresponder ao nome do seu arquivo HTML sem a extensão .html
    }
    

    @GetMapping("/ws")
    public String ws() {
        return "testServer";
    }
}
