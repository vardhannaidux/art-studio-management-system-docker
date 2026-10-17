package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.ArtStudio;
import com.klef.soa.exam.repository.ArtStudioRepository;

@Service
public class ArtStudioServiceImpl implements ArtStudioService {

    @Autowired
    private ArtStudioRepository repository;

    @Override
    public ArtStudio addArtStudio(ArtStudio artStudio) {
        return repository.save(artStudio);
    }

    @Override
    public List<ArtStudio> displayAll() {
        return repository.findAll();
    }

    @Override
    public boolean deleteArtStudio(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }
}