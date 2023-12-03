package com.demeter.gestaoagro.service;

import com.demeter.gestaoagro.exception.RegistroNaoEncontradoException;
import com.demeter.gestaoagro.exception.RegistroNaoPodeSerAtualizadoException;
import com.demeter.gestaoagro.model.Registro;
import com.demeter.gestaoagro.repository.RegistroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistroService {

    private static final Logger log = LoggerFactory.getLogger(RegistroService.class);

    private final RegistroRepository registroRepository;

    public RegistroService(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    public Registro salvarRegistro(Registro registro) {
        log.info("Salvando registro: {}", registro);
        if (registro == null) {
            throw new IllegalArgumentException("O registro não pode ser nulo");
        }
        return registroRepository.save(registro);
    }

    public List<Registro> listarRegistros() {
        log.info("Listando todos os registros");
        return registroRepository.findAll();
    }

    public Optional<Registro> obterRegistroPorId(String id) {
        log.info("Obtendo registro por ID: {}", id);
        return registroRepository.findById(id);
    }

    public Registro atualizarRegistro(String id, Registro novoRegistro) {
        Registro registroExistente = registroRepository.findById(id)
                .orElseThrow(() -> new RegistroNaoEncontradoException("Registro não encontrado"));

        registroExistente.setNome(novoRegistro.getNome());
        registroExistente.setEmail(novoRegistro.getEmail());
        registroExistente.setSenha(novoRegistro.getSenha());

        return registroRepository.save(registroExistente);
    }

    public void deletarRegistro(String id) {
        Registro registroExistente = registroRepository.findById(id)
                .orElseThrow(() -> new RegistroNaoEncontradoException("Registro não encontrado"));

        registroRepository.delete(registroExistente);
    }

    public Registro autenticarRegistro(String email, String senha) {
        Optional<Registro> registroOptional = registroRepository.findByEmailAndSenha(email, senha);
        return registroOptional.orElse(null);
    }
}
