package com.klef.soa.docker.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.klef.soa.docker.entity.ArtStudio;
import com.klef.soa.docker.repository.ArtStudioRepository;
import com.klef.soa.docker.service.ArtStudioService;

@Service
public class ArtStudioServiceImpl implements ArtStudioService {

    private final ArtStudioRepository repository;

    public ArtStudioServiceImpl(ArtStudioRepository repository) {
        this.repository = repository;
    }

    @Override
    public ArtStudio addArtStudio(ArtStudio artStudio) {
        return repository.save(artStudio);
    }

    @Override
    public List<ArtStudio> getAllArtStudios() {
        return repository.findAll();
    }

    @Override
    public ArtStudio getArtStudioById(int id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Art studio not found: " + id));
    }

    @Override
    public ArtStudio updateArtStudio(int id, ArtStudio artStudio) {
        ArtStudio existing = getArtStudioById(id);

        existing.setStudioName(artStudio.getStudioName());
        existing.setOwnerName(artStudio.getOwnerName());
        existing.setMonthlyRent(artStudio.getMonthlyRent());
        existing.setActive(artStudio.isActive());

        return repository.save(existing);
    }

    @Override
    public void deleteArtStudio(int id) {
        ArtStudio existing = getArtStudioById(id);
        repository.delete(existing);
    }
}
