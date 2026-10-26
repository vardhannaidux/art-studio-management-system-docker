package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.entity.ArtStudio;
import com.klef.soa.docker.service.ArtStudioService;

@RestController
@RequestMapping("/artstudio")
@CrossOrigin(origins = "*")
public class ArtStudioController {

    private final ArtStudioService service;

    public ArtStudioController(ArtStudioService service) {
        this.service = service;
    }

    @PostMapping({"/add", ""})
    public ArtStudio addArtStudio(@RequestBody ArtStudio artStudio) {
        return service.addArtStudio(artStudio);
    }

    @GetMapping({"/displayall", ""})
    public List<ArtStudio> getAllArtStudios() {
        return service.getAllArtStudios();
    }

    @GetMapping("/{id}")
    public ArtStudio getArtStudioById(@PathVariable int id) {
        return service.getArtStudioById(id);
    }

    @PutMapping({"/update/{id}", "/{id}"})
    public ArtStudio updateArtStudio(
            @PathVariable int id,
            @RequestBody ArtStudio artStudio) {
        return service.updateArtStudio(id, artStudio);
    }

    @DeleteMapping({"/delete/{id}", "/{id}"})
    public String deleteArtStudio(@PathVariable int id) {
        service.deleteArtStudio(id);
        return "Art studio deleted successfully";
    }
}
