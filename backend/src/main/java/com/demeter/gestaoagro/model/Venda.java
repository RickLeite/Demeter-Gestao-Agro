package com.demeter.gestaoagro.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "venda")
@Getter
@Setter
public class Venda {
    @Id
    private String id;
    private String nomeCliente;
    private String cnpj;
    private String saleDate;
    private List<Produto> produtos;
    private double valorTotal;
}