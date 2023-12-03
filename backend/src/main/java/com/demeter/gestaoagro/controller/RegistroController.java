package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.Registro;
import com.demeter.gestaoagro.service.RegistroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/registro")
public class RegistroController {

    private final RegistroService registroService;
    private static final Logger logger = LoggerFactory.getLogger(RegistroController.class);

    public RegistroController(RegistroService registroService) {
        this.registroService = registroService;
    }


    

    @GetMapping("/cadastrar")
    public String mostrarFormularioCadastro() {
        return "registro";
    }

    @PostMapping("/cadastrar")
    public ModelAndView cadastrarRegistro(@ModelAttribute Registro registro, Model model) {
        ModelAndView modelAndView = new ModelAndView();
        try {
            registroService.salvarRegistro(registro);
            modelAndView.setViewName("redirect:/login");
        } catch (Exception e) {
            model.addAttribute("erro", "Erro ao cadastrar o registro: " + e.getMessage());
            modelAndView.setViewName("erro");
        }
        return modelAndView;
    }

    @PostMapping("/autenticar")
    public ResponseEntity<?> autenticarRegistro(@RequestBody Registro dadosLogin) {
    logger.info("Tentativa de autenticação para o email: {}", dadosLogin.getEmail());
    
    Registro registroAutenticado = registroService.autenticarRegistro(dadosLogin.getEmail(), dadosLogin.getSenha());
    if (registroAutenticado != null) {
        // Altere a string de redirecionamento conforme necessário
        String json = "{\"status\": \"success\", \"redirect\": \"/perfil.html\"}";
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(json);
    } else {
        // Tratamento de erro
        String json = "{\"status\": \"error\", \"message\": \"Usuário ou senha inválidos\"}";
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).contentType(MediaType.APPLICATION_JSON).body(json);
    }
}

    @GetMapping("/listar")
    public String listarRegistros(Model model) {
        List<Registro> registros = registroService.listarRegistros();
        model.addAttribute("registros", registros);
        return "listaRegistros";
    }

    @GetMapping("/{id}")
    public String obterRegistroPorId(@PathVariable String id, Model model) {
        Optional<Registro> registro = registroService.obterRegistroPorId(id);
        if (registro.isPresent()) {
            model.addAttribute("registro", registro.get());
            return "detalhesRegistro";
        } else {
            return "registroNaoEncontrado";
        }
    }

    @GetMapping("/editar/{id}")
    public String mostrarFormularioEdicao(@PathVariable String id, Model model) {
        Optional<Registro> registro = registroService.obterRegistroPorId(id);
        if (registro.isPresent()) {
            model.addAttribute("registro", registro.get());
            return "editarRegistro";
        } else {
            return "registroNaoEncontrado";
        }
    }

    @PostMapping("/editar/{id}")
    public String atualizarRegistro(@PathVariable String id, @ModelAttribute Registro novoRegistro, Model model) {
        try {
            Registro registroAtualizado = registroService.atualizarRegistro(id, novoRegistro);
            model.addAttribute("mensagem", "Registro atualizado com sucesso! ID: " + registroAtualizado.getId());
            return "sucesso";
        } catch (Exception e) {
            model.addAttribute("erro", "Erro ao atualizar o registro: " + e.getMessage());
            return "erro";
        }
    }

    @GetMapping("/deletar/{id}")
    public String mostrarFormularioDelecao(@PathVariable String id, Model model) {
        Optional<Registro> registro = registroService.obterRegistroPorId(id);
        if (registro.isPresent()) {
            model.addAttribute("registro", registro.get());
            return "deletarRegistro";
        } else {
            return "registroNaoEncontrado";
        }
    }

    @PostMapping("/deletar/{id}")
    public String deletarRegistro(@PathVariable String id, Model model) {
        try {
            registroService.deletarRegistro(id);
            model.addAttribute("mensagem", "Registro deletado com sucesso!");
            return "sucesso";
        } catch (Exception e) {
            model.addAttribute("erro", "Erro ao deletar o registro: " + e.getMessage());
            return "erro";
        }
    }

    
}
