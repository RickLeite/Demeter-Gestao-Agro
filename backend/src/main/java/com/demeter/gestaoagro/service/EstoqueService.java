package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.model.Estoque;
import com.demeter.gestaoagro.repository.EstoqueRepository;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class EstoqueService {

    private final EstoqueRepository estoqueRepository;
    private final MongoTemplate mongoTemplate;

    public EstoqueService(EstoqueRepository estoqueRepository, MongoTemplate mongoTemplate) {
        this.estoqueRepository = estoqueRepository;
        this.mongoTemplate = mongoTemplate;
    }
    public boolean existsById(ObjectId id) {
        return estoqueRepository.existsById(id);
    }

    public Estoque getById(ObjectId id) {
        return estoqueRepository.findById(id).orElse(null);
    }

    public List<Estoque> getEstoqueByNomeProduto(String nomeProduto) {
        return estoqueRepository.findByNomeProduto(nomeProduto);
    }

    public List<Estoque> getAllEstoque() {
        return estoqueRepository.findAll();
    }

    public Estoque saveEstoque(Estoque estoque) {
        return estoqueRepository.save(estoque);
    }

    public List<Estoque> saveEstoques(List<Estoque> estoques) {
        return estoqueRepository.saveAll(estoques);
    }

    public void removeEstoque(ObjectId id) {
        estoqueRepository.deleteById(id);
    }

    public Estoque getLastAddedEstoque() {
        List<Estoque> estoques = estoqueRepository.findAll();
        if (!estoques.isEmpty()) {
            return estoques.get(estoques.size() - 1);
        }
        return null;
    }

    public Estoque updateEstoque(ObjectId id, Estoque novoEstoque) {
        if (existsById(id)) {
            Estoque estoqueAtual = getById(id);

            estoqueAtual.setNomeProduto(novoEstoque.getNomeProduto());
            estoqueAtual.setQuantidade(novoEstoque.getQuantidade());
            estoqueAtual.setPreco(novoEstoque.getPreco());

            return estoqueRepository.save(estoqueAtual);
        } else {
            return null;
        }
    }

    public List<Estoque> getEstoqueByQuery(Query query) {
        return mongoTemplate.find(query, Estoque.class);
    }

    public List<Estoque> getLastNEstoque(int count) {
        Pageable pageable = PageRequest.of(0, count, Sort.by(Sort.Order.desc("id.date")));

        return estoqueRepository.findAll(pageable).getContent();
    }


}

