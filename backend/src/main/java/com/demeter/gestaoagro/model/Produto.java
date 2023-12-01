package com.demeter.gestaoagro.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Produto {
    private String nomeProduto;
    private int quantidade;
    private double valorUnitario;
}