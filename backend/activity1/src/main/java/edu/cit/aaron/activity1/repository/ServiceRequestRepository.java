package edu.cit.aaron.activity1.repository;

import edu.cit.aaron.activity1.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByCreatedByUsername(String username);
}