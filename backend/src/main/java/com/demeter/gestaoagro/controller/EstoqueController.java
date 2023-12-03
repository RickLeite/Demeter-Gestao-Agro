package com.demeter.gestaoagro.controller;
import com.demeter.gestaoagro.service.EstoqueService;
import com.demeter.gestaoagro.model.Estoque;
import org.bson.types.ObjectId;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


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
    public ResponseEntity<Estoque> addEstoque(@RequestBody Estoque estoque) {
        Estoque savedEstoque = estoqueService.saveEstoque(estoque);
        return ResponseEntity.ok(savedEstoque);
    }

    @PostMapping("/addBatch")
    public List<Estoque> addEstoques(@RequestBody List<Estoque> estoques) {
        return estoqueService.saveEstoques(estoques);
    }

    @DeleteMapping("/removeLast")
    public ResponseEntity<String> removeLastEstoque() {
        Estoque lastEstoque = estoqueService.getLastAddedEstoque();

        if (lastEstoque != null) {
            ObjectId lastEstoqueId = lastEstoque.id;
            estoqueService.removeEstoque(lastEstoqueId);
            return new ResponseEntity<>("Removed last Estoque with ID: " + lastEstoqueId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Estoque items to remove", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byNomeProduto")
    public ResponseEntity<List<Estoque>> getEstoqueByNomeProduto(@RequestParam("nomeProduto") String nomeProduto) {
        List<Estoque> estoqueList = estoqueService.getEstoqueByNomeProduto(nomeProduto);

        if (!estoqueList.isEmpty()) {
            return new ResponseEntity<>(estoqueList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byOwner")
    public ResponseEntity<List<Estoque>> getEstoqueByOwner(@RequestParam("owner") String owner) {
        List<Estoque> estoqueList = estoqueService.getEstoqueByOwner(owner);

        if (!estoqueList.isEmpty()) {
            return new ResponseEntity<>(estoqueList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byNomeProdutoAndOwner")
    public ResponseEntity<List<Estoque>> getEstoqueByNomeProdutoAndOwner(
            @RequestParam("nomeProduto") String nomeProduto, @RequestParam("owner") String owner) {
        List<Estoque> estoqueList = estoqueService.getEstoqueByNomeProdutoAndOwner(nomeProduto, owner);

        if (!estoqueList.isEmpty()) {
            return new ResponseEntity<>(estoqueList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeEstoqueById(@PathVariable String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            estoqueService.removeEstoque(objectId);
            return new ResponseEntity<>("Removed Estoque with ID: " + id, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid ObjectId format for ID: " + id, HttpStatus.BAD_REQUEST);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("No Estoque item found with ID: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEstoque(@PathVariable String id, @RequestBody Estoque estoque) {
        try {
            ObjectId objectId = new ObjectId(id);

            if (estoqueService.existsById(objectId)) {
                Estoque existingEstoque = estoqueService.getById(objectId);

                existingEstoque.setNomeProduto(estoque.getNomeProduto());
                existingEstoque.setQuantidade(estoque.getQuantidade());
                existingEstoque.setPreco(estoque.getPreco());

                estoqueService.saveEstoque(existingEstoque);

                return new ResponseEntity<>("Updated Estoque with ID: " + id, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No Estoque item found with ID: " + id, HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid ObjectId format for ID: " + id, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/sorted/{criteria}")
    public ResponseEntity<List<Estoque>> getSortedEstoque(@PathVariable String criteria) {
        Sort.Direction direction = Sort.Direction.ASC; // Padrão: ordenação ascendente
        if (criteria.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }

        Sort sort = Sort.by(direction, "quantidade");

        Query query = new Query().with(sort);

        // Obtém a lista de itens de estoque ordenados por quantidade
        List<Estoque> estoqueList = estoqueService.getEstoqueByQuery(query);

        return new ResponseEntity<>(estoqueList, HttpStatus.OK);
    }

    @GetMapping("/lastN/{count}")
    public ResponseEntity<List<Estoque>> getLastNEstoque(@PathVariable int count) {
        List<Estoque> estoqueList = estoqueService.getLastNEstoque(count);
        return new ResponseEntity<>(estoqueList, HttpStatus.OK);
    }


}
