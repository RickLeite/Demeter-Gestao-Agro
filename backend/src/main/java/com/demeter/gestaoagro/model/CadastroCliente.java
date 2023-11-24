package com.demeter.gestaoagro.model;

import org.springframework.data.annotation.Id;
import java.time.LocalDate;

public class CadastroCliente {

    @Id
    private String id;

    private String nome;
    private LocalDate dataNascimento;
    private String cpf;
    private String nomeEmpresa;
    private String cnpj;

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

    public boolean isCnpjValido() {
        if (this.cnpj == null || this.cnpj.length() != 14) {
            return false;
        }

        try {
            Long.parseLong(this.cnpj);
        } catch (NumberFormatException e) {
            return false;
        }

        int[] pesoCNPJ = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int soma = 0;
        int dig = 0;

        for (int i = 0; i < 12; i++) {
            soma += Integer.parseInt(cnpj.substring(i, i + 1)) * pesoCNPJ[i + 1];
        }

        dig = soma % 11;
        if (dig < 2) {
            dig = 0;
        } else {
            dig = 11 - dig;
        }

        if (Integer.parseInt(cnpj.substring(12, 13)) != dig) {
            return false;
        }

        soma = 0;
        for (int i = 0; i < 13; i++) {
            soma += Integer.parseInt(cnpj.substring(i, i + 1)) * pesoCNPJ[i];
        }

        dig = soma % 11;
        if (dig < 2) {
            dig = 0;
        } else {
            dig = 11 - dig;
        }

        return Integer.parseInt(cnpj.substring(13)) == dig;
    }

    public boolean isCpfValido() {
        cpf = cpf.replaceAll("[.-]", ""); // Remove pontos e traços.

        if (cpf.length() != 11 || cpf.matches(cpf.charAt(0) + "{11}")) return false;

        int soma = 0, resto;
        for (int i = 1; i <= 9; i++) {
            soma += Integer.parseInt(cpf.substring(i-1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) {
            resto = 0;
        }
        if (resto != Integer.parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (int i = 1; i <= 10; i++) {
            soma += Integer.parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) {
            resto = 0;
        }
        return resto == Integer.parseInt(cpf.substring(10, 11));
    }
}