package com.securestay.controller;

import com.securestay.model.Visitor;
import com.securestay.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "*")
public class VisitorController {

    @Autowired
    private VisitorService service;

    // 1. Check-In (Existing)
    @PostMapping("/check-in")
    public Visitor processCheckIn(@RequestBody Visitor visitor) {
        return service.checkIn(visitor);
    }

    // 2. Check-Out (Existing)
    @PutMapping("/check-out/{id}")
    public Visitor processCheckOut(@PathVariable Long id) {
        return service.checkOut(id);
    }

    // 3. Get All History (New - for Admin View)
    @GetMapping("/history")
    public List<Visitor> getFullHistory() {
        return service.getAllVisitors();
    }

    // 4. Get Active Visitors Only (New - for "Who is in the building?" list)
    @GetMapping("/active")
    public List<Visitor> getActiveVisitors() {
        return service.getActiveVisitors();
    }
}