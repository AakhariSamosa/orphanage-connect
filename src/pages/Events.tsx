import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Play, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-children.jpg";
import buildingImage from "@/assets/orphanage-building.jpg";

const tabs = [
  { id: "feed", name: "Social Feed" },
  { id: "events", name: "Upcoming Events" },
  { id: "gallery", name: "Photo Gallery" },
];

const feedPosts = [
  {
    id: 1,
    type: "image",
    image: heroImage,
    caption: "Annual Day celebrations were a huge success! Our children showcased their talents in dance, drama, and music. Thank you to all the donors and volunteers who made this possible! 🎉",
    likes: 245,
    comments: 32,
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "video",
    thumbnail: buildingImage,
    caption: "Watch our children's morning routine - yoga, prayers, and a nutritious breakfast to start the day right. 🌅",
    likes: 189,
    comments: 18,
    time: "1 day ago",
  },
  {
    id: 3,
    type: "image",
    image: buildingImage,
    caption: "New school uniforms donated by the Nagpur Rotary Club! Thank you for ensuring our children go to school with confidence. 👔📚",
    likes: 312,
    comments: 45,
    time: "3 days ago",
  },
  {
    id: 4,
    type: "image",
    image: heroImage,
    caption: "Art class in progress! Creative expression is an important part of our curriculum. Look at these budding artists! 🎨",
    likes: 156,
    comments: 12,
    time: "5 days ago",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Day Celebration",
    date: "February 15, 2024",
    time: "5:00 PM onwards",
    location: "Orphanage Auditorium",
    description: "Join us for cultural performances, awards ceremony, and dinner.",
    image: heroImage,
  },
  {
    id: 2,
    title: "Health Camp",
    date: "February 28, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Orphanage Premises",
    description: "Free health checkups for all children. Volunteers welcome!",
    image: buildingImage,
  },
  {
    id: 3,
    title: "Career Guidance Workshop",
    date: "March 10, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Conference Hall",
    description: "Guidance session for senior students about career options.",
    image: heroImage,
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">Events & Media</span>
            <h1 className="heading-display mb-6">
              Life at <span className="gradient-text">Shradhanand</span>
            </h1>
            <p className="text-body">
              Get a glimpse into the daily life, events, and celebrations at our orphanage. Follow our journey and see the impact of your support.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border sticky top-16 md:top-20 z-40 bg-background">
        <div className="container-custom">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {activeTab === "feed" && (
            <div className="max-w-2xl mx-auto space-y-8">
              {feedPosts.map((post) => (
                <article key={post.id} className="bg-card rounded-2xl shadow-soft overflow-hidden">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Shri Shradhanand Anathalay</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>

                  {/* Post Media */}
                  <div className="relative">
                    <img
                      src={post.image || post.thumbnail}
                      alt="Post"
                      className="w-full aspect-square object-cover"
                    />
                    {post.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <Heart
                            className={`w-6 h-6 ${
                              likedPosts.includes(post.id) ? "fill-primary text-primary" : ""
                            }`}
                          />
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageCircle className="w-6 h-6" />
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Share2 className="w-6 h-6" />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className="hover:text-primary transition-colors"
                      >
                        <Bookmark
                          className={`w-6 h-6 ${
                            savedPosts.includes(post.id) ? "fill-primary text-primary" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="font-semibold text-sm mb-1">
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">shradhanand_anathalay</span>{" "}
                      {post.caption}
                    </p>
                    <button className="text-sm text-muted-foreground mt-2">
                      View all {post.comments} comments
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "events" && (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-card rounded-2xl shadow-soft overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="heading-card mb-2">{event.title}</h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...feedPosts, ...feedPosts].map((post, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                >
                  <img
                    src={post.image || post.thumbnail}
                    alt="Gallery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-4 text-primary-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-5 h-5" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" /> {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Follow CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="heading-section mb-4">Stay Connected</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Follow us on social media to get daily updates about our children and events.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="heroOutline" size="lg">
              Follow on Instagram
            </Button>
            <Button variant="heroOutline" size="lg">
              Subscribe on YouTube
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
