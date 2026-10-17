package com.klef.soa.exam.service;

import java.util.List;

import com.klef.soa.exam.entity.ArtStudio;

public interface ArtStudioService {

    ArtStudio addArtStudio(ArtStudio artStudio);

    List<ArtStudio> displayAll();

    boolean deleteArtStudio(Long id);
}