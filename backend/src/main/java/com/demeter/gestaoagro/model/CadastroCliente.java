package com.demeter.gestaoagro.model;

import org.springframework.data.annotation.Id;
import java.time.LocalDate; // Importe necessário para trabalhar com datas

public class CadastroCliente {

    @Id
    private String id;

    private String nome;
    private LocalDate dataNascimento; // Usando LocalDate para datas sem horário
    private String cpf;
    private String nomeEmpresa;
    private String cnpj;

    // Getters e setters para cada campo

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    // Método toString() comentado, descomente se necessário
    // @Override
    // public String toString() {
    //     return "CadastroCliente{" +
    //             "id='" + id + '\'' +
    //             ", nome='" + nome + '\'' +
    //             ", dataNascimento=" + dataNascimento +
    //             ", cpf='" + cpf + '\'' +
    //             ", nomeEmpresa='" + nomeEmpresa + '\'' +
    //             ", cnpj='" + cnpj + '\'' +
    //             '}';
    // }
}
