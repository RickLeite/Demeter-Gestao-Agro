package com.demeter.gestaoagro.controller;
import com.demeter.gestaoagro.service.EstoqueService;
import com.demeter.gestaoagro.model.Estoque;

import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

    private final EstoqueService estoqueService;

    public EstoqueController(EstoqueService estoqueService) {
        this.estoqueService = estoqueService;
    }

    @GetMapping("/all")
    public List<Estoque> getAllEstoque() {
        return estoqueService.getAllEstoque();
    }

    @PostMapping("/add")
    public Estoque addEstoque(@RequestBody Estoque estoque) {
        return estoqueService.saveEstoque(estoque);
    }

    @PostMapping("/addBatch")
    public List<Estoque> addEstoques(@RequestBody List<Estoque> estoques) {
        return estoqueService.saveEstoques(estoques);
    }

    @DeleteMapping("/remove/{id}")
    public void removeEstoque(@PathVariable String id) {
        estoqueService.removeEstoque(new ObjectId(id));
    }


}
