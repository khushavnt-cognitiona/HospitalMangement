package com.hms.service.impl;

import com.hms.entity.*;
import com.hms.repository.*;
import com.hms.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionPlanRepository planRepository;
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final UserRepository userRepository;

    @Override
    public List<SubscriptionPlan> getAllPlans() {
        return planRepository.findAll();
    }

    @Override
    @Transactional
    public UserSubscription subscribe(Long userId, Long planId) {
        User user = userRepository.findById(userId).orElseThrow();
        SubscriptionPlan plan = planRepository.findById(planId).orElseThrow();

        UserSubscription subscription = userSubscriptionRepository.findByUser(user)
                .orElse(UserSubscription.builder().user(user).build());

        subscription.setPlan(plan);
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusDays(plan.getDurationDays()));
        subscription.setActive(true);

        return userSubscriptionRepository.save(subscription);
    }

    @Override
    public UserSubscription getUserSubscription(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return userSubscriptionRepository.findByUser(user).orElse(null);
    }

    @Override
    public boolean isSubscriptionActive(Long userId) {
        UserSubscription sub = getUserSubscription(userId);
        if (sub == null || !sub.getActive()) return false;
        return sub.getEndDate().isAfter(LocalDateTime.now());
    }
}
