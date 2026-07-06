export default function TripNestLandingPage() {
    const token = localStorage.getItem("AuthToken");
    const styles = {
        page: {
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            overflowX: 'hidden'
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 60px',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        },
        logo: {
            fontSize: '32px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg,#6366F1,#8B5CF6,#06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        navLinks: {
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
        },
        navItem: {
            color: '#CBD5E1',
            textDecoration: 'none',
            fontSize: '16px',
            transition: '0.3s'
        },
        loginBtn: {
            background: 'transparent',
            border: '1px solid #6366F1',
            padding: '10px 22px',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer'
        },
        signupBtn: {
            background: 'linear-gradient(90deg,#6366F1,#8B5CF6)',
            border: 'none',
            padding: '12px 26px',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
        },
        hero: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '100px 60px',
            gap: '50px',
            flexWrap: 'wrap'
        },
        heroLeft: {
            flex: 1,
            minWidth: '320px'
        },
        heroTitle: {
            fontSize: '68px',
            lineHeight: '1.1',
            marginBottom: '25px',
            fontWeight: '900'
        },
        gradientText: {
            background: 'linear-gradient(90deg,#6366F1,#06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        heroText: {
            fontSize: '20px',
            color: '#CBD5E1',
            lineHeight: '1.8',
            marginBottom: '35px'
        },
        heroButtons: {
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
        },
        primaryBtn: {
            background: 'linear-gradient(90deg,#6366F1,#8B5CF6)',
            border: 'none',
            padding: '16px 34px',
            borderRadius: '14px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
        },
        secondaryBtn: {
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '16px 34px',
            borderRadius: '14px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
        },
        heroRight: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            minWidth: '320px'
        },
        dashboardCard: {
            width: '100%',
            maxWidth: '520px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '30px',
            padding: '30px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)'
        },
        dashboardTop: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '25px'
        },
        miniCard: {
            background: 'rgba(255,255,255,0.06)',
            padding: '20px',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.08)'
        },
        miniLabel: {
            color: '#CBD5E1',
            fontSize: '14px',
            marginBottom: '8px'
        },
        miniValue: {
            fontSize: '28px',
            fontWeight: 'bold'
        },
        section: {
            padding: '90px 60px'
        },
        sectionTitle: {
            fontSize: '52px',
            textAlign: 'center',
            marginBottom: '20px'
        },
        sectionSubtitle: {
            color: '#CBD5E1',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto 60px auto',
            lineHeight: '1.8',
            fontSize: '18px'
        },
        featureGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: '30px'
        },
        featureCard: {
            background: 'rgba(255,255,255,0.06)',
            padding: '35px',
            borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: '0.3s',
            backdropFilter: 'blur(10px)'
        },
        featureIcon: {
            fontSize: '45px',
            marginBottom: '20px'
        },
        featureTitle: {
            fontSize: '24px',
            marginBottom: '14px',
            fontWeight: 'bold'
        },
        featureText: {
            color: '#CBD5E1',
            lineHeight: '1.8'
        },
        statsSection: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: '25px'
        },
        statCard: {
            background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))',
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.08)'
        },
        statNumber: {
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        statLabel: {
            color: '#CBD5E1',
            fontSize: '18px'
        },
        howGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '30px'
        },
        stepCard: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '25px',
            padding: '35px',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.08)'
        },
        stepNumber: {
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            background: 'linear-gradient(90deg,#6366F1,#06B6D4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            marginBottom: '20px'
        },
        testimonialGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: '30px'
        },
        testimonialCard: {
            background: 'rgba(255,255,255,0.05)',
            padding: '35px',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)'
        },
        quote: {
            color: '#CBD5E1',
            lineHeight: '1.9',
            marginBottom: '25px'
        },
        userRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        },
        avatar: {
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            background: 'linear-gradient(90deg,#6366F1,#06B6D4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        },
        ctaSection: {
            padding: '100px 60px'
        },
        ctaBox: {
            background: 'linear-gradient(135deg,#6366F1,#8B5CF6,#06B6D4)',
            borderRadius: '35px',
            padding: '80px 40px',
            textAlign: 'center'
        },
        ctaTitle: {
            fontSize: '56px',
            marginBottom: '20px',
            fontWeight: 'bold'
        },
        ctaText: {
            maxWidth: '700px',
            margin: '0 auto 35px auto',
            fontSize: '20px',
            lineHeight: '1.8'
        },
        footer: {
            padding: '40px 60px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
        }
    }
    function handleClick() {
        if (token) {
            window.location.href = "/newhome";
        } else {
            window.location.href = "/regi";
        }

    }
    return (
        <div style={styles.page}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <div style={styles.logo}>TripNest</div>

                <div style={styles.navLinks}>
                    <a href="#features" style={styles.navItem}>Features</a>
                    <a href="#analytics" style={styles.navItem}>Analytics</a>
                    <a href="#testimonials" style={styles.navItem}>Reviews</a>
                    <button style={styles.loginBtn} onClick={() => handleClick()}>
                        Login
                    </button>
                    <button style={styles.signupBtn} onClick={() => handleClick()}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroLeft}>
                    <h1 style={styles.heroTitle}>
                        Plan Trips Together. <br />
                        <span style={styles.gradientText}>Manage Shared Expenses Easily.</span>
                    </h1>

                    <p style={styles.heroText}>
                        TripNest helps friend groups transparently manage travel savings,
                        split expenses, track contributions, and organize group trips
                        through one powerful collaborative platform.
                    </p>

                    <div style={styles.heroButtons}>
                        <button style={styles.primaryBtn} onClick={() => handleClick()}>
                            Start Saving
                        </button>
                        <button style={styles.secondaryBtn}>Watch Demo</button>
                    </div>
                </div>

                <div style={styles.heroRight}>
                    <div style={styles.dashboardCard}>
                        <div style={styles.dashboardTop}>
                            <div style={styles.miniCard}>
                                <div style={styles.miniLabel}>Total Saved</div>
                                <div style={styles.miniValue}>₹45,000</div>
                            </div>

                            <div style={styles.miniCard}>
                                <div style={styles.miniLabel}>Goal Amount</div>
                                <div style={styles.miniValue}>₹60,000</div>
                            </div>

                            <div style={styles.miniCard}>
                                <div style={styles.miniLabel}>Expenses</div>
                                <div style={styles.miniValue}>₹12,500</div>
                            </div>

                            <div style={styles.miniCard}>
                                <div style={styles.miniLabel}>Trip Countdown</div>
                                <div style={styles.miniValue}>18 Days</div>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '22px',
                            padding: '25px'
                        }}>
                            <h3 style={{ marginBottom: '20px' }}>Recent Activities</h3>

                            <div style={{ marginBottom: '15px', color: '#CBD5E1' }}>
                                Rahul added ₹1000 contribution
                            </div>

                            <div style={{ marginBottom: '15px', color: '#CBD5E1' }}>
                                Arun paid ₹3000 for hotel
                            </div>

                            <div style={{ color: '#CBD5E1' }}>
                                Goal progress updated to 75%
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" style={styles.section}>
                <h2 style={styles.sectionTitle}>Powerful Features</h2>

                <p style={styles.sectionSubtitle}>
                    Everything your travel group needs to manage savings, expenses,
                    planning, and budgeting with complete financial transparency.
                </p>

                <div style={styles.featureGrid}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>💰</div>
                        <div style={styles.featureTitle}>Group Savings</div>
                        <div style={styles.featureText}>
                            Track every contribution made by group members and monitor
                            collective travel savings in real time.
                        </div>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>📊</div>
                        <div style={styles.featureTitle}>Analytics Dashboard</div>
                        <div style={styles.featureText}>
                            Visualize group expenses, contribution patterns, and spending
                            categories using interactive charts.
                        </div>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🧾</div>
                        <div style={styles.featureTitle}>Expense Splitting</div>
                        <div style={styles.featureText}>
                            Automatically calculate who owes whom after every shared
                            expense added by group members.
                        </div>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🌍</div>
                        <div style={styles.featureTitle}>Trip Planning</div>
                        <div style={styles.featureText}>
                            Organize destinations, budgets, trip dates, and travel goals
                            from one centralized platform.
                        </div>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🔔</div>
                        <div style={styles.featureTitle}>Activity Timeline</div>
                        <div style={styles.featureText}>
                            Stay updated with recent contributions, expenses, and trip
                            activities through a clean timeline feed.
                        </div>
                    </div>

                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>📱</div>
                        <div style={styles.featureTitle}>Responsive Design</div>
                        <div style={styles.featureText}>
                            Enjoy a seamless experience across desktop, tablet, and mobile
                            devices with a modern responsive interface.
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={styles.section}>
                <div style={styles.statsSection}>
                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>120+</div>
                        <div style={styles.statLabel}>Trips Managed</div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>₹5L+</div>
                        <div style={styles.statLabel}>Expenses Tracked</div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>95%</div>
                        <div style={styles.statLabel}>User Satisfaction</div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={styles.statNumber}>10K+</div>
                        <div style={styles.statLabel}>Contributions Added</div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>How TripNest Works</h2>

                <p style={styles.sectionSubtitle}>
                    Create your travel group, invite friends, track expenses, and plan
                    your dream trips without financial confusion.
                </p>

                <div style={styles.howGrid}>
                    <div style={styles.stepCard}>
                        <div style={styles.stepNumber}>1</div>
                        <h3>Create Group</h3>
                        <p style={{ color: '#CBD5E1', lineHeight: '1.8' }}>
                            Start by creating a travel group and setting your destination,
                            budget goal, and trip date.
                        </p>
                    </div>

                    <div style={styles.stepCard}>
                        <div style={styles.stepNumber}>2</div>
                        <h3>Invite Members</h3>
                        <p style={{ color: '#CBD5E1', lineHeight: '1.8' }}>
                            Share your invite code with friends and collaborate together on
                            travel savings and planning.
                        </p>
                    </div>

                    <div style={styles.stepCard}>
                        <div style={styles.stepNumber}>3</div>
                        <h3>Add Contributions</h3>
                        <p style={{ color: '#CBD5E1', lineHeight: '1.8' }}>
                            Members can add contributions and monitor progress toward the
                            overall trip savings goal.
                        </p>
                    </div>

                    <div style={styles.stepCard}>
                        <div style={styles.stepNumber}>4</div>
                        <h3>Track Expenses</h3>
                        <p style={{ color: '#CBD5E1', lineHeight: '1.8' }}>
                            Record expenses during the trip and automatically split costs
                            among group members.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" style={styles.section}>
                <h2 style={styles.sectionTitle}>What Users Say</h2>

                <p style={styles.sectionSubtitle}>
                    Thousands of travelers use TripNest to simplify group trip planning
                    and expense management.
                </p>

                <div style={styles.testimonialGrid}>
                    <div style={styles.testimonialCard}>
                        <p style={styles.quote}>
                            “TripNest completely solved the confusion in our Goa trip.
                            Everyone could track expenses transparently.”
                        </p>

                        <div style={styles.userRow}>
                            <div style={styles.avatar}>R</div>
                            <div>
                                <strong>Rahul S</strong>
                                <div style={{ color: '#CBD5E1' }}>Travel Enthusiast</div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.testimonialCard}>
                        <p style={styles.quote}>
                            “The expense splitting feature made it easy to manage shared
                            costs without awkward calculations.”
                        </p>

                        <div style={styles.userRow}>
                            <div style={styles.avatar}>A</div>
                            <div>
                                <strong>Arun P</strong>
                                <div style={{ color: '#CBD5E1' }}>College Student</div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.testimonialCard}>
                        <p style={styles.quote}>
                            “Beautiful interface, simple workflow, and excellent budgeting
                            tools for group travel planning.”
                        </p>

                        <div style={styles.userRow}>
                            <div style={styles.avatar}>N</div>
                            <div>
                                <strong>Nithin K</strong>
                                <div style={{ color: '#CBD5E1' }}>Adventure Traveler</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaBox}>
                    <h2 style={styles.ctaTitle}>Start Planning Smarter Trips Today</h2>

                    <p style={styles.ctaText}>
                        Join TripNest and experience seamless group savings, transparent
                        expense management, and stress-free travel planning.
                    </p>

                    <button
                        style={{
                            background: '#fff',
                            color: '#0F172A',
                            border: 'none',
                            padding: '18px 38px',
                            borderRadius: '14px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleClick()}
                    >
                        Create Your First Group
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <div>
                    <div style={styles.logo}>TripNest</div>
                    <div style={{ marginTop: '10px', color: '#CBD5E1' }}>
                        Collaborative Travel Savings Platform
                    </div>
                </div>

                <div style={{ color: '#CBD5E1' }}>
                    © 2026 TripNest. All Rights Reserved.
                </div>
            </footer>
        </div>
    )
}
