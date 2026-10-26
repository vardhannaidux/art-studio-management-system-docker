package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.entity.ArtStudio;

public interface ArtStudioService {

    ArtStudio addArtStudio(ArtStudio artStudio);

    List<ArtStudio> getAllArtStudios();

    ArtStudio getArtStudioById(int id);

    ArtStudio updateArtStudio(int id, ArtStudio artStudio);

    void deleteArtStudio(int id);
}
