import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharactersById } from "../services/api";
import type { Character } from "../types/character";
import { TbPointFilled } from "react-icons/tb";
import { FaGenderless } from "react-icons/fa";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { GrStatusUnknown } from "react-icons/gr";
import { MdLocationOn, MdPublic } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import AddToFavButton from "../components/add-to-fav-button";

const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [responseCharacter, setResponseCharacter] = useState<Character | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const getCharacterDetails = async () => {
      try {
        setLoading(true);
        const response = await getCharactersById(parseInt(id));
        setResponseCharacter(response);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load character details"
        );
      } finally {
        setLoading(false);
      }
    };

    getCharacterDetails();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "Male":
        return <BsGenderMale className="text-blue-600" size={14} />;
      case "Female":
        return <BsGenderFemale className="text-pink-600" size={14} />;
      case "Genderless":
        return <FaGenderless className="text-purple-600" size={25} />;
      default:
        return <GrStatusUnknown className="text-gray-400" size={14} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Alive":
        return <TbPointFilled className="text-green-500" size={16} />;
      case "Dead":
        return <TbPointFilled className="text-red-500" size={16} />;
      default:
        return <TbPointFilled className="text-gray-400" size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center border border-gray-200 rounded-lg p-8 max-w-md">
          <p className="text-gray-900 font-semibold">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!responseCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center border border-gray-200 rounded-lg p-8 max-w-md">
          <p className="text-gray-900 font-semibold">Character not found</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Characters
        </Link>

        {/* Main Content */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 relative sm:p-12 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Character Image */}
              <div className="shrink-0">
                <img
                  className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg border border-gray-200 object-cover"
                  src={responseCharacter.image}
                  alt={responseCharacter.name}
                />
              </div>

              {/* Character Info */}
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  {responseCharacter.name}
                </h1>

                <div className="space-y-3">
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 w-24">
                      Status:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-semibold text-gray-900">
                        {responseCharacter.status}
                      </span>
                      {getStatusIcon(responseCharacter.status)}
                    </div>
                  </div>

                  {/* Species */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 w-24">
                      Species:
                    </span>
                    <span className="text-base font-semibold text-gray-900">
                      {responseCharacter.species}
                    </span>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 w-24">
                      Gender:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-semibold text-gray-900">
                        {responseCharacter.gender}
                      </span>
                      {getGenderIcon(responseCharacter.gender)}
                    </div>
                  </div>

                  {/* Type */}
                  {responseCharacter.type && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 w-24">
                        Type:
                      </span>
                      <span className="text-base font-semibold text-gray-900">
                        {responseCharacter.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <AddToFavButton
          id={responseCharacter.id}
          name={responseCharacter.name}
          image={responseCharacter.image}
          status={responseCharacter.status}
          species={responseCharacter.species}
          gender={responseCharacter.gender}
        />
          </div>

          {/* Details Grid */}
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Location Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <MdLocationOn size={24} />
                  Location
                </h2>

                {/* Origin */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <MdPublic
                      className="text-gray-400 mt-0.5 hrink-0"
                      size={20}
                    />
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Origin
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {responseCharacter.origin.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Current Location */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <MdLocationOn
                      className="text-gray-400 mt-0.5 shrink-0"
                      size={20}
                    />
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Last Known Location
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {responseCharacter.location.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Created Date */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt
                      className="text-gray-400 mt-0.5 shrink-0"
                      size={20}
                    />
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Character Added
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(responseCharacter.created)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Episodes Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <BiCameraMovie size={24} />
                  Episodes ({responseCharacter.episode.length})
                </h2>

                <div className="border border-gray-200 rounded-lg p-5">
                  <div className="max-h-125 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {responseCharacter.episode.map((episodeUrl, index) => {
                        const episodeNumber = episodeUrl.split("/").pop();
                        return (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg px-3 py-3 text-center hover:border-gray-900 hover:bg-gray-50 transition-all group"
                          >
                            <span className="text-xs text-gray-500 font-medium block mb-0.5">
                              Ep
                            </span>
                            <p className="text-lg font-bold text-gray-900 group-hover:text-gray-900">
                              {episodeNumber}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CharacterDetailPage;
