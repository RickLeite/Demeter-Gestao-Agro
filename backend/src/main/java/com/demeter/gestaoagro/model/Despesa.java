package com.demeter.gestaoagro.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Despesa {
    @Id
    private String id;
    private String dataDespesa;
    private Double valorDespesa;
    private String descricaoDespesa;
    private boolean pago;
    private String anexo;

    // Getters
    public String getId() {
        return id;
    }

    public String getDataDespesa() {
        return dataDespesa;
    }

    public Double getValorDespesa() {
        return valorDespesa;
    }

    public String getDescricaoDespesa() {
        return descricaoDespesa;
    }

    public boolean isPago() {
        return pago;
    }

    public String getAnexo() {
        return anexo;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setDataDespesa(String dataDespesa) {
        this.dataDespesa = dataDespesa;
    }

    public void setValorDespesa(Double valorDespesa) {
        this.valorDespesa = valorDespesa;
    }

    public void setDescricaoDespesa(String descricaoDespesa) {
        this.descricaoDespesa = descricaoDespesa;
    }

    public void setPago(boolean pago) {
        this.pago = pago;
    }

    public void setAnexo(String anexo) {
        this.anexo = anexo;
    }
}