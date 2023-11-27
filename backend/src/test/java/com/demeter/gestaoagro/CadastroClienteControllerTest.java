package com.demeter.gestaoagro;

import com.demeter.gestaoagro.controller.CadastroClienteController;
import com.demeter.gestaoagro.model.CadastroCliente;
import com.demeter.gestaoagro.service.CadastroClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class CadastroClienteControllerTest {

    @Mock
    private CadastroClienteService cadastroClienteService;

    @InjectMocks
    private CadastroClienteController cadastroClienteController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testAddCadastroCliente_Valido() {
        System.out.println("Caso de Teste: testAddCadastroCliente_Valido");
        CadastroCliente cadastroCliente = new CadastroCliente();
        cadastroCliente.setCnpj("74886512000133");
        cadastroCliente.setCpf("90076528006");

        when(cadastroClienteService.saveCadastroCliente(cadastroCliente)).thenReturn(cadastroCliente);

        ResponseEntity<?> responseEntity = cadastroClienteController.addCadastroCliente(cadastroCliente);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(cadastroCliente, responseEntity.getBody());
        verify(cadastroClienteService, times(1)).saveCadastroCliente(cadastroCliente);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testAddCadastroCliente_InvalidoCnpj() {
        System.out.println("Caso de Teste: testAddCadastroCliente_InvalidoCnpj");
        CadastroCliente cadastroCliente = new CadastroCliente();
        cadastroCliente.setCnpj("invalidCnpj");
        cadastroCliente.setCpf("12345678901");

        ResponseEntity<?> responseEntity = cadastroClienteController.addCadastroCliente(cadastroCliente);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("CNPJ invalido", responseEntity.getBody());
        verify(cadastroClienteService, never()).saveCadastroCliente(any());
        System.out.println("Resultado: Teste bem-sucedido\n");
    }

    @Test
    void testAddCadastroClientes_Valido() {
        System.out.println("Caso de Teste: testAddCadastroClientes_Valido");
        CadastroCliente cliente1 = new CadastroCliente();
        cliente1.setCnpj("31145031000164");
        cliente1.setCpf("89134297057");

        CadastroCliente cliente2 = new CadastroCliente();
        cliente2.setCnpj("97859708000134");
        cliente2.setCpf("29401346003");

        List<CadastroCliente> cadastroClientes = Arrays.asList(cliente1, cliente2);

        when(cadastroClienteService.saveCadastroClientes(cadastroClientes)).thenReturn(cadastroClientes);

        ResponseEntity<?> responseEntity = cadastroClienteController.addCadastroClientes(cadastroClientes);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(cadastroClientes, responseEntity.getBody());
        verify(cadastroClienteService, times(1)).saveCadastroClientes(cadastroClientes);
        System.out.println("Resultado: Teste bem-sucedido\n");
    }
}
