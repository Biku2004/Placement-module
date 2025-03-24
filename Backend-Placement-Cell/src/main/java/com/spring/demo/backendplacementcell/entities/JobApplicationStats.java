package com.spring.demo.backendplacementcell.entities;

public class JobApplicationStats {
    private final int totalApplications;
    private final long interviewsAttended;
    private final int interviewPercentage;
    private final long offersReceived;
    private final long rejectedOffers;

    public JobApplicationStats(int totalApplications, long interviewsAttended, int interviewPercentage,
                               long offersReceived, long rejectedOffers) {
        this.totalApplications = totalApplications;
        this.interviewsAttended = interviewsAttended;
        this.interviewPercentage = interviewPercentage;
        this.offersReceived = offersReceived;
        this.rejectedOffers = rejectedOffers;
    }

    public int getTotalApplications() { return totalApplications; }
    public long getInterviewsAttended() { return interviewsAttended; }
    public int getInterviewPercentage() { return interviewPercentage; }
    public long getOffersReceived() { return offersReceived; }
    public long getRejectedOffers() { return rejectedOffers; }
}
