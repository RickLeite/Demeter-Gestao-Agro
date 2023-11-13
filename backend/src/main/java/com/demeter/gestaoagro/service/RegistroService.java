package com.demeter.gestaoagro.service;

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

    public Optional<Registro> obterRegistroPorId(Long id) {
        return registroRepository.findById(id);
    }

    public Registro atualizarRegistro(Long id, Registro novoRegistro) {
        Registro registroExistente = registroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado"));

        registroExistente.setNome(novoRegistro.getNome());
        registroExistente.setEmail(novoRegistro.getEmail());
        registroExistente.setSenha(novoRegistro.getSenha());

        return registroRepository.save(registroExistente);
    }

    public void deletarRegistro(Long id) {
        // Implemente a lógica para deletar o registro ou lance uma exceção se não existir
        Registro registroExistente = registroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado"));

        registroRepository.delete(registroExistente);
    }
}
