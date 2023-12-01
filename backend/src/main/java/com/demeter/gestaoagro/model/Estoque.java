package com.demeter.gestaoagro.model;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Estoque {
    @Id
    public ObjectId id;
    private String nomeProduto;
    private int quantidade;
    private double preco;

    public String getId() {
        return id.toHexString();
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }
}
