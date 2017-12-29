package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Linea.
 */
@Entity
@Table(name = "linea")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Linea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_de_trenes")
    private Integer numeroDeTrenes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroDeTrenes() {
        return numeroDeTrenes;
    }

    public Linea numeroDeTrenes(Integer numeroDeTrenes) {
        this.numeroDeTrenes = numeroDeTrenes;
        return this;
    }

    public void setNumeroDeTrenes(Integer numeroDeTrenes) {
        this.numeroDeTrenes = numeroDeTrenes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Linea linea = (Linea) o;
        if (linea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), linea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Linea{" +
            "id=" + getId() +
            ", numeroDeTrenes='" + getNumeroDeTrenes() + "'" +
            "}";
    }
}
