package com.demeter.gestaoagro.controller;

import com.demeter.gestaoagro.model.Registro;
import com.demeter.gestaoagro.service.RegistroService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/registro")
public class RegistroController {

    private final RegistroService registroService;

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
            return modelAndView;
        } catch (Exception e) {
            model.addAttribute("erro", "Erro ao cadastrar o registro: " + e.getMessage());
            modelAndView.setViewName("erro");
            return modelAndView;
        }
    }

    @PostMapping("/autenticar")
    public ModelAndView autenticarRegistro(@RequestParam String email, @RequestParam String senha, Model model) {
        ModelAndView modelAndView = new ModelAndView();

        try {
            Registro registroAutenticado = registroService.autenticarRegistro(email, senha);

            if (registroAutenticado != null) {
                modelAndView.addObject("registro", registroAutenticado);
                modelAndView.setViewName("redirect:/perfil");
                return modelAndView;
            } else {
                model.addAttribute("erro", "Usuário ou senha inválidos");
                modelAndView.setViewName("erro");
                return modelAndView;
            }
        } catch (Exception e) {
            model.addAttribute("erro", "Erro ao autenticar o registro: " + e.getMessage());
            modelAndView.setViewName("erro");
            return modelAndView;
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
