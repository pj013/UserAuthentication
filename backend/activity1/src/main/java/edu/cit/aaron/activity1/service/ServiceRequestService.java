package edu.cit.aaron.activity1.service;

import edu.cit.aaron.activity1.model.ServiceRequest;
import edu.cit.aaron.activity1.model.User;
import edu.cit.aaron.activity1.repository.ServiceRequestRepository;
import edu.cit.aaron.activity1.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository,
                                 UserRepository userRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
    }

    public ServiceRequest createRequest(String title, String description,
                                        String category, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ServiceRequest request = new ServiceRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setCategory(category);
        request.setDateCreated(LocalDateTime.now());
        request.setCreatedBy(user);

        return serviceRequestRepository.save(request);
    }

    public List<ServiceRequest> getUserRequests(String username) {
        return serviceRequestRepository.findByCreatedByUsername(username);
    }

    public ServiceRequest getRequest(Long id, String username) {
        ServiceRequest request = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service request not found"));

        if (!request.getCreatedBy().getUsername().equals(username)) {
            throw new RuntimeException("You are not allowed to access this request");
        }

        return request;
    }

    public ServiceRequest updateRequest(Long id, String title,
                                        String description, String category,
                                        String username) {

        ServiceRequest request = getRequest(id, username);

        request.setTitle(title);
        request.setDescription(description);
        request.setCategory(category);

        return serviceRequestRepository.save(request);
    }

    public void deleteRequest(Long id, String username) {

        ServiceRequest request = getRequest(id, username);

        serviceRequestRepository.delete(request);
    }
}