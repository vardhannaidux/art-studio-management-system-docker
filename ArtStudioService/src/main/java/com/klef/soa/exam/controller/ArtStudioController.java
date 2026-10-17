package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.exam.entity.ArtStudio;
import com.klef.soa.exam.service.ArtStudioService;

@RestController
@RequestMapping("/artstudio")
public class ArtStudioController {
    @Autowired
    private ArtStudioService service;
    @PostMapping("/add")
    public ResponseEntity<ArtStudio> addArtStudio(
            @RequestBody ArtStudio artStudio) {

        ArtStudio saved = service.addArtStudio(artStudio);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @GetMapping("/displayall")
    public ResponseEntity<List<ArtStudio>> displayAll() {

        return ResponseEntity.ok(service.displayAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        boolean deleted = service.deleteArtStudio(id);

        if (deleted == false) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("ArtStudio deleted successfully");
    }
}