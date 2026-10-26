package com.klef.soa.docker.dto;

import java.math.BigDecimal;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response payload representing an Art Studio record")
public class ArtStudioResponse {

    @Schema(description = "Unique database identifier of the art studio", example = "1")
    private Long id;

    @Schema(description = "Name of the art studio", example = "Creative Canvas Studio")
    private String studioName;

    @Schema(description = "Full name of the studio owner", example = "Aarav Sharma")
    private String ownerName;

    @Schema(description = "Monthly rent amount in INR", example = "15000.00")
    private BigDecimal monthlyRent;

    @Schema(description = "Status indicating whether the art studio is active", example = "true")
    private Boolean active;

    public ArtStudioResponse() {
    }

    public ArtStudioResponse(Long id, String studioName, String ownerName, BigDecimal monthlyRent, Boolean active) {
        this.id = id;
        this.studioName = studioName;
        this.ownerName = ownerName;
        this.monthlyRent = monthlyRent;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudioName() {
        return studioName;
    }

    public void setStudioName(String studioName) {
        this.studioName = studioName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
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

    public static ArtStudioResponseBuilder builder() {
        return new ArtStudioResponseBuilder();
    }

    public static class ArtStudioResponseBuilder {
        private Long id;
        private String studioName;
        private String ownerName;
        private BigDecimal monthlyRent;
        private Boolean active;

        ArtStudioResponseBuilder() {
        }

        public ArtStudioResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ArtStudioResponseBuilder studioName(String studioName) {
            this.studioName = studioName;
            return this;
        }

        public ArtStudioResponseBuilder ownerName(String ownerName) {
            this.ownerName = ownerName;
            return this;
        }

        public ArtStudioResponseBuilder monthlyRent(BigDecimal monthlyRent) {
            this.monthlyRent = monthlyRent;
            return this;
        }

        public ArtStudioResponseBuilder active(Boolean active) {
            this.active = active;
            return this;
        }

        public ArtStudioResponse build() {
            return new ArtStudioResponse(id, studioName, ownerName, monthlyRent, active);
        }
    }
}
