package com.klef.soa.docker.dto;

import java.math.BigDecimal;
import java.util.Objects;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for creating or updating an Art Studio")
public class ArtStudioRequest {

    @NotBlank(message = "Studio name is required and cannot be blank")
    @Size(max = 100, message = "Studio name must not exceed 100 characters")
    @Schema(description = "Name of the art studio", example = "Creative Canvas Studio", requiredMode = Schema.RequiredMode.REQUIRED)
    private String studioName;

    @NotBlank(message = "Owner name is required and cannot be blank")
    @Size(max = 100, message = "Owner name must not exceed 100 characters")
    @Schema(description = "Full name of the studio owner", example = "Aarav Sharma", requiredMode = Schema.RequiredMode.REQUIRED)
    private String ownerName;

    @NotNull(message = "Monthly rent is required")
    @DecimalMin(value = "0.01", inclusive = true, message = "Monthly rent must be greater than zero")
    @Digits(integer = 10, fraction = 2, message = "Monthly rent must have up to 10 integer digits and 2 decimal places")
    @Schema(description = "Monthly rent amount in INR", example = "15000.00", requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal monthlyRent;

    @NotNull(message = "Active status is required")
    @Schema(description = "Status indicating whether the art studio is active", example = "true", requiredMode = Schema.RequiredMode.REQUIRED)
    private Boolean active;

    public ArtStudioRequest() {
    }

    public ArtStudioRequest(String studioName, String ownerName, BigDecimal monthlyRent, Boolean active) {
        this.studioName = studioName != null ? studioName.trim() : null;
        this.ownerName = ownerName != null ? ownerName.trim() : null;
        this.monthlyRent = monthlyRent;
        this.active = active;
    }

    public String getStudioName() {
        return studioName != null ? studioName.trim() : null;
    }

    public void setStudioName(String studioName) {
        this.studioName = studioName != null ? studioName.trim() : null;
    }

    public String getOwnerName() {
        return ownerName != null ? ownerName.trim() : null;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName != null ? ownerName.trim() : null;
    }

    public BigDecimal getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(BigDecimal monthlyRent) {
        this.monthlyRent = monthlyRent;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArtStudioRequest that = (ArtStudioRequest) o;
        return Objects.equals(studioName, that.studioName) &&
               Objects.equals(ownerName, that.ownerName) &&
               Objects.equals(monthlyRent, that.monthlyRent) &&
               Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studioName, ownerName, monthlyRent, active);
    }

    @Override
    public String toString() {
        return "ArtStudioRequest{" +
                "studioName='" + studioName + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", monthlyRent=" + monthlyRent +
                ", active=" + active +
                '}';
    }

    public static ArtStudioRequestBuilder builder() {
        return new ArtStudioRequestBuilder();
    }

    public static class ArtStudioRequestBuilder {
        private String studioName;
        private String ownerName;
        private BigDecimal monthlyRent;
        private Boolean active;

        ArtStudioRequestBuilder() {
        }

        public ArtStudioRequestBuilder studioName(String studioName) {
            this.studioName = studioName;
            return this;
        }

        public ArtStudioRequestBuilder ownerName(String ownerName) {
            this.ownerName = ownerName;
            return this;
        }

        public ArtStudioRequestBuilder monthlyRent(BigDecimal monthlyRent) {
            this.monthlyRent = monthlyRent;
            return this;
        }

        public ArtStudioRequestBuilder active(Boolean active) {
            this.active = active;
            return this;
        }

        public ArtStudioRequest build() {
            return new ArtStudioRequest(studioName, ownerName, monthlyRent, active);
        }
    }
}
