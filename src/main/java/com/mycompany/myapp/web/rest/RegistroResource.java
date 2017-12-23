package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Registro;

import com.mycompany.myapp.repository.RegistroRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Registro.
 */
@RestController
@RequestMapping("/api")
public class RegistroResource {

    private final Logger log = LoggerFactory.getLogger(RegistroResource.class);

    private static final String ENTITY_NAME = "registro";

    private final RegistroRepository registroRepository;

    public RegistroResource(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    /**
     * POST  /registros : Create a new registro.
     *
     * @param registro the registro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new registro, or with status 400 (Bad Request) if the registro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/registros")
    @Timed
    public ResponseEntity<Registro> createRegistro(@RequestBody Registro registro) throws URISyntaxException {
        log.debug("REST request to save Registro : {}", registro);
        if (registro.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new registro cannot already have an ID")).body(null);
        }
        Registro result = registroRepository.save(registro);
        return ResponseEntity.created(new URI("/api/registros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /registros : Updates an existing registro.
     *
     * @param registro the registro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated registro,
     * or with status 400 (Bad Request) if the registro is not valid,
     * or with status 500 (Internal Server Error) if the registro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/registros")
    @Timed
    public ResponseEntity<Registro> updateRegistro(@RequestBody Registro registro) throws URISyntaxException {
        log.debug("REST request to update Registro : {}", registro);
        if (registro.getId() == null) {
            return createRegistro(registro);
        }
        Registro result = registroRepository.save(registro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, registro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /registros : get all the registros.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of registros in body
     */
    @GetMapping("/registros")
    @Timed
    public ResponseEntity<List<Registro>> getAllRegistros(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Registros");
        Page<Registro> page = registroRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/registros");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /registros/:id : get the "id" registro.
     *
     * @param id the id of the registro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the registro, or with status 404 (Not Found)
     */
    @GetMapping("/registros/{id}")
    @Timed
    public ResponseEntity<Registro> getRegistro(@PathVariable Long id) {
        log.debug("REST request to get Registro : {}", id);
        Registro registro = registroRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(registro));
    }

    /**
     * DELETE  /registros/:id : delete the "id" registro.
     *
     * @param id the id of the registro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/registros/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegistro(@PathVariable Long id) {
        log.debug("REST request to delete Registro : {}", id);
        registroRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
