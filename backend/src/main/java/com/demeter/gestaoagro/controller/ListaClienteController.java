package com.demeter.gestaoagro.controller;
import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.service.ListaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/clientes") // Ajuste a rota conforme necessário
public class ListaClienteController {

    private final ListaClienteService listaClienteService;

    @Autowired
    public ListaClienteController(ListaClienteService listaClienteService) {
        this.listaClienteService = listaClienteService;
    }

    @GetMapping("/lista")
    public List<CadastroCliente> listarTodosOsClientes() {
        return listaClienteService.listarTodos();
    }
}
