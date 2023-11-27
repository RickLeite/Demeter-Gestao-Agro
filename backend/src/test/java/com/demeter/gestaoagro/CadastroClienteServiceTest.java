package com.demeter.gestaoagro;

import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.repository.CadastroClienteRepository;
import com.demeter.gestaoagro.service.CadastroClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CadastroClienteServiceTest {

    @Mock
    private CadastroClienteRepository cadastroClienteRepository;

    @InjectMocks
    private CadastroClienteService cadastroClienteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveCadastroCliente() {
        System.out.println("Caso de Teste: testSaveCadastroCliente");
        CadastroCliente cadastroCliente = new CadastroCliente();
        when(cadastroClienteRepository.save(cadastroCliente)).thenReturn(cadastroCliente);

        CadastroCliente result = cadastroClienteService.saveCadastroCliente(cadastroCliente);

        assertEquals(cadastroCliente, result);
        verify(cadastroClienteRepository, times(1)).save(cadastroCliente);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testSaveCadastroClientes() {
        System.out.println("Caso de Teste: testSaveCadastroClientes");
        CadastroCliente cliente1 = new CadastroCliente();
        CadastroCliente cliente2 = new CadastroCliente();
        List<CadastroCliente> cadastroClientes = Arrays.asList(cliente1, cliente2);

        when(cadastroClienteRepository.saveAll(cadastroClientes)).thenReturn(cadastroClientes);

        List<CadastroCliente> result = cadastroClienteService.saveCadastroClientes(cadastroClientes);

        assertEquals(cadastroClientes, result);
        verify(cadastroClienteRepository, times(1)).saveAll(cadastroClientes);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testCnpjExiste_Exists() {
        System.out.println("Caso de Teste: testCnpjExiste_Exists");
        String cnpj = "74886512000133";
        when(cadastroClienteRepository.findByCnpj(cnpj)).thenReturn(Optional.of(new CadastroCliente()));

        assertTrue(cadastroClienteService.cnpjExiste(cnpj));
        verify(cadastroClienteRepository, times(1)).findByCnpj(cnpj);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testCnpjExiste_NotExists() {
        System.out.println("Caso de Teste: testCnpjExiste_NotExists");
        String cnpj = "81089792000114";
        when(cadastroClienteRepository.findByCnpj(cnpj)).thenReturn(Optional.empty());

        assertFalse(cadastroClienteService.cnpjExiste(cnpj));
        verify(cadastroClienteRepository, times(1)).findByCnpj(cnpj);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testCpfExiste_Exists() {
        System.out.println("Caso de Teste: testCpfExiste_Exists");
        String cpf = "90076528006";
        when(cadastroClienteRepository.findByCpf(cpf)).thenReturn(Optional.of(new CadastroCliente()));

        assertTrue(cadastroClienteService.cpfExiste(cpf));
        verify(cadastroClienteRepository, times(1)).findByCpf(cpf);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testCpfExiste_NotExists() {
        System.out.println("Caso de Teste: testCpfExiste_NotExists");
        String cpf = "18720304080";
        when(cadastroClienteRepository.findByCpf(cpf)).thenReturn(Optional.empty());

        assertFalse(cadastroClienteService.cpfExiste(cpf));
        verify(cadastroClienteRepository, times(1)).findByCpf(cpf);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }
}
