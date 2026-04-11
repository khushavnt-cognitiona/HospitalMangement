package com.hms.service;

import com.hms.entity.SubscriptionPlan;
import com.hms.entity.UserSubscription;
import java.util.List;

public interface SubscriptionService {
    List<SubscriptionPlan> getAllPlans();
    UserSubscription subscribe(Long userId, Long planId);
    UserSubscription getUserSubscription(Long userId);
    boolean isSubscriptionActive(Long userId);
}
