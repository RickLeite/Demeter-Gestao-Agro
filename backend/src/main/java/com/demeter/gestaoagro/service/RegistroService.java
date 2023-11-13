package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.exception.RegistroNaoEncontradoException;
import com.demeter.gestaoagro.exception.RegistroNaoPodeSerAtualizadoException;
import com.demeter.gestaoagro.model.Registro;
import com.demeter.gestaoagro.repository.RegistroRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistroService {

    private final RegistroRepository registroRepository;

    public RegistroService(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    public Registro salvarRegistro(Registro registro) {
        return registroRepository.save(registro);
    }

    public List<Registro> listarRegistros() {
        return registroRepository.findAll();
    }

    public Optional<Registro> obterRegistroPorId(String id) {
        return registroRepository.findById(id);
    }

    public Registro atualizarRegistro(String id, Registro novoRegistro) {
        try {
            Registro registroExistente = registroRepository.findById(id)
                    .orElseThrow(() -> new RegistroNaoEncontradoException("Registro não encontrado"));

            registroExistente.setNome(novoRegistro.getNome());
            registroExistente.setEmail(novoRegistro.getEmail());
            registroExistente.setSenha(novoRegistro.getSenha());

            return registroRepository.save(registroExistente);
        } catch (RegistroNaoEncontradoException e) {
            throw new RegistroNaoPodeSerAtualizadoException("Não foi possível atualizar o registro: " + e.getMessage());
        }
    }

    public void deletarRegistro(String id) {
        try {
            Registro registroExistente = registroRepository.findById(id)
                    .orElseThrow(() -> new RegistroNaoEncontradoException("O Registro não encontrado"));

            registroRepository.delete(registroExistente);
        } catch (RegistroNaoEncontradoException e) {
            throw new RegistroNaoPodeSerAtualizadoException("Erro ao deletar o registro informado: " + e.getMessage());
        }
    }
}