package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EntidadApp;

import com.mycompany.myapp.domain.Registro;
import com.mycompany.myapp.repository.RegistroRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.TipoCV;
import com.mycompany.myapp.domain.enumeration.Linea;
import com.mycompany.myapp.domain.enumeration.Accion;
/**
 * Test class for the RegistroResource REST controller.
 *
 * @see RegistroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EntidadApp.class)
public class RegistroResourceIntTest {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final TipoCV DEFAULT_TIPO_CV = TipoCV.TUNEL;
    private static final TipoCV UPDATED_TIPO_CV = TipoCV.ESTACION;

    private static final Linea DEFAULT_LINEA = Linea.L1;
    private static final Linea UPDATED_LINEA = Linea.L2;

    private static final String DEFAULT_NOMBRE_CV = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CV = "BBBBBBBBBB";

    private static final String DEFAULT_CHAPA = "AAAAAAAAAA";
    private static final String UPDATED_CHAPA = "BBBBBBBBBB";

    private static final Accion DEFAULT_ACCION = Accion.OCUPA;
    private static final Accion UPDATED_ACCION = Accion.LIBERA;

    @Autowired
    private RegistroRepository registroRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegistroMockMvc;

    private Registro registro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RegistroResource registroResource = new RegistroResource(registroRepository);
        this.restRegistroMockMvc = MockMvcBuilders.standaloneSetup(registroResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Registro createEntity(EntityManager em) {
        Registro registro = new Registro()
            .fecha(DEFAULT_FECHA)
            .hora(DEFAULT_HORA)
            .tipoCV(DEFAULT_TIPO_CV)
            .linea(DEFAULT_LINEA)
            .nombreCV(DEFAULT_NOMBRE_CV)
            .chapa(DEFAULT_CHAPA)
            .accion(DEFAULT_ACCION);
        return registro;
    }

    @Before
    public void initTest() {
        registro = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegistro() throws Exception {
        int databaseSizeBeforeCreate = registroRepository.findAll().size();

        // Create the Registro
        restRegistroMockMvc.perform(post("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registro)))
            .andExpect(status().isCreated());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeCreate + 1);
        Registro testRegistro = registroList.get(registroList.size() - 1);
        assertThat(testRegistro.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testRegistro.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testRegistro.getTipoCV()).isEqualTo(DEFAULT_TIPO_CV);
        assertThat(testRegistro.getLinea()).isEqualTo(DEFAULT_LINEA);
        assertThat(testRegistro.getNombreCV()).isEqualTo(DEFAULT_NOMBRE_CV);
        assertThat(testRegistro.getChapa()).isEqualTo(DEFAULT_CHAPA);
        assertThat(testRegistro.getAccion()).isEqualTo(DEFAULT_ACCION);
    }

    @Test
    @Transactional
    public void createRegistroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = registroRepository.findAll().size();

        // Create the Registro with an existing ID
        registro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegistroMockMvc.perform(post("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registro)))
            .andExpect(status().isBadRequest());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRegistros() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);

        // Get all the registroList
        restRegistroMockMvc.perform(get("/api/registros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(registro.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())))
            .andExpect(jsonPath("$.[*].tipoCV").value(hasItem(DEFAULT_TIPO_CV.toString())))
            .andExpect(jsonPath("$.[*].linea").value(hasItem(DEFAULT_LINEA.toString())))
            .andExpect(jsonPath("$.[*].nombreCV").value(hasItem(DEFAULT_NOMBRE_CV.toString())))
            .andExpect(jsonPath("$.[*].chapa").value(hasItem(DEFAULT_CHAPA.toString())))
            .andExpect(jsonPath("$.[*].accion").value(hasItem(DEFAULT_ACCION.toString())));
    }

    @Test
    @Transactional
    public void getRegistro() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);

        // Get the registro
        restRegistroMockMvc.perform(get("/api/registros/{id}", registro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(registro.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.hora").value(DEFAULT_HORA.toString()))
            .andExpect(jsonPath("$.tipoCV").value(DEFAULT_TIPO_CV.toString()))
            .andExpect(jsonPath("$.linea").value(DEFAULT_LINEA.toString()))
            .andExpect(jsonPath("$.nombreCV").value(DEFAULT_NOMBRE_CV.toString()))
            .andExpect(jsonPath("$.chapa").value(DEFAULT_CHAPA.toString()))
            .andExpect(jsonPath("$.accion").value(DEFAULT_ACCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRegistro() throws Exception {
        // Get the registro
        restRegistroMockMvc.perform(get("/api/registros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegistro() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);
        int databaseSizeBeforeUpdate = registroRepository.findAll().size();

        // Update the registro
        Registro updatedRegistro = registroRepository.findOne(registro.getId());
        updatedRegistro
            .fecha(UPDATED_FECHA)
            .hora(UPDATED_HORA)
            .tipoCV(UPDATED_TIPO_CV)
            .linea(UPDATED_LINEA)
            .nombreCV(UPDATED_NOMBRE_CV)
            .chapa(UPDATED_CHAPA)
            .accion(UPDATED_ACCION);

        restRegistroMockMvc.perform(put("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegistro)))
            .andExpect(status().isOk());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeUpdate);
        Registro testRegistro = registroList.get(registroList.size() - 1);
        assertThat(testRegistro.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testRegistro.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testRegistro.getTipoCV()).isEqualTo(UPDATED_TIPO_CV);
        assertThat(testRegistro.getLinea()).isEqualTo(UPDATED_LINEA);
        assertThat(testRegistro.getNombreCV()).isEqualTo(UPDATED_NOMBRE_CV);
        assertThat(testRegistro.getChapa()).isEqualTo(UPDATED_CHAPA);
        assertThat(testRegistro.getAccion()).isEqualTo(UPDATED_ACCION);
    }

    @Test
    @Transactional
    public void updateNonExistingRegistro() throws Exception {
        int databaseSizeBeforeUpdate = registroRepository.findAll().size();

        // Create the Registro

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegistroMockMvc.perform(put("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registro)))
            .andExpect(status().isCreated());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRegistro() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);
        int databaseSizeBeforeDelete = registroRepository.findAll().size();

        // Get the registro
        restRegistroMockMvc.perform(delete("/api/registros/{id}", registro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Registro.class);
        Registro registro1 = new Registro();
        registro1.setId(1L);
        Registro registro2 = new Registro();
        registro2.setId(registro1.getId());
        assertThat(registro1).isEqualTo(registro2);
        registro2.setId(2L);
        assertThat(registro1).isNotEqualTo(registro2);
        registro1.setId(null);
        assertThat(registro1).isNotEqualTo(registro2);
    }
}
