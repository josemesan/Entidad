package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.TipoCV;

import com.mycompany.myapp.domain.enumeration.Linea;

import com.mycompany.myapp.domain.enumeration.Accion;

/**
 * A Registro.
 */
@Entity
@Table(name = "registro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Registro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "hora")
    private Instant hora;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cv")
    private TipoCV tipoCV;

    @Enumerated(EnumType.STRING)
    @Column(name = "linea")
    private Linea linea;

    @Column(name = "nombre_cv")
    private String nombreCV;

    @Column(name = "chapa")
    private String chapa;

    @Enumerated(EnumType.STRING)
    @Column(name = "accion")
    private Accion accion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Registro fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Instant getHora() {
        return hora;
    }

    public Registro hora(Instant hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(Instant hora) {
        this.hora = hora;
    }

    public TipoCV getTipoCV() {
        return tipoCV;
    }

    public Registro tipoCV(TipoCV tipoCV) {
        this.tipoCV = tipoCV;
        return this;
    }

    public void setTipoCV(TipoCV tipoCV) {
        this.tipoCV = tipoCV;
    }

    public Linea getLinea() {
        return linea;
    }

    public Registro linea(Linea linea) {
        this.linea = linea;
        return this;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
    }

    public String getNombreCV() {
        return nombreCV;
    }

    public Registro nombreCV(String nombreCV) {
        this.nombreCV = nombreCV;
        return this;
    }

    public void setNombreCV(String nombreCV) {
        this.nombreCV = nombreCV;
    }

    public String getChapa() {
        return chapa;
    }

    public Registro chapa(String chapa) {
        this.chapa = chapa;
        return this;
    }

    public void setChapa(String chapa) {
        this.chapa = chapa;
    }

    public Accion getAccion() {
        return accion;
    }

    public Registro accion(Accion accion) {
        this.accion = accion;
        return this;
    }

    public void setAccion(Accion accion) {
        this.accion = accion;
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
        Registro registro = (Registro) o;
        if (registro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Registro{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", hora='" + getHora() + "'" +
            ", tipoCV='" + getTipoCV() + "'" +
            ", linea='" + getLinea() + "'" +
            ", nombreCV='" + getNombreCV() + "'" +
            ", chapa='" + getChapa() + "'" +
            ", accion='" + getAccion() + "'" +
            "}";
    }
}
