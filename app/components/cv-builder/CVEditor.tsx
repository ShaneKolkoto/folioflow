"use client";

import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  UserGroupIcon,
  GlobeAltIcon,
  XMarkIcon,
  CheckIcon,
  LinkIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  TrophyIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface CVEditorProps {
  section: string;
  data: any;
  onUpdate: (data: any) => void;
}

export default function CVEditor({ section, data, onUpdate }: CVEditorProps) {
  const [localData, setLocalData] = useState<any>(data || {});
  const handleChange = (field: string, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleArrayAdd = (field: string, defaultValue: any = "") => {
    const currentArray = Array.isArray(localData[field])
      ? localData[field]
      : [];
    const updatedArray = [...currentArray, defaultValue];
    handleChange(field, updatedArray);
  };

  const handleArrayRemove = (field: string, index: number) => {
    const currentArray = Array.isArray(localData[field])
      ? localData[field]
      : [];
    const updatedArray = currentArray.filter((_, i) => i !== index);
    handleChange(field, updatedArray);
  };

  const handleArrayUpdate = (field: string, index: number, value: any) => {
    const currentArray = Array.isArray(localData[field])
      ? localData[field]
      : [];
    const updatedArray = [...currentArray];
    updatedArray[index] = value;
    handleChange(field, updatedArray);
  };

  const handleArrayMove = (
    field: string,
    index: number,
    direction: "up" | "down"
  ) => {
    const currentArray = Array.isArray(localData[field])
      ? localData[field]
      : [];
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === currentArray.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedArray = [...currentArray];
    [updatedArray[index], updatedArray[newIndex]] = [
      updatedArray[newIndex],
      updatedArray[index],
    ];
    handleChange(field, updatedArray);
  };

  // Render different editors based on section
  const renderSectionEditor = () => {
    switch (section) {
      case "userInfo":
        return renderPersonalInfoEditor();
      case "workExperience":
        return renderExperienceEditor();
      case "education":
        return renderEducationEditor();
      case "skills":
        return renderSkillsEditor();
      case "projects":
        return renderProjectsEditor();
      case "certifications":
        return renderCertificationsEditor();
      case "socialLinks":
        return renderSocialLinksEditor();
      case "achievements":
        return renderAchievementsEditor();
      default:
        return renderGenericEditor();
    }
  };

  const renderPersonalInfoEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={data.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          value={data.bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={4}
          className="w-full h-fit px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Experienced software engineer with 5+ years in web development..."
        />
        <p className="mt-2 text-sm text-gray-500">
          Write a brief summary highlighting your key skills and experience.
        </p>
      </div>
    </div>
  );

  const renderExperienceEditor = () => {
    const experiences = Array.isArray(data) ? data : [];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
          <button
            onClick={() =>
              handleArrayAdd("", {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
                location: "",
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Experience
          </button>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              No work experience added yet
            </div>
            <p className="text-sm text-gray-500">
              Add your work experience to showcase your professional journey.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Experience #{index + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleArrayMove("", index, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayMove("", index, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === experiences.length - 1}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayRemove("", index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...exp,
                          company: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Google"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...exp,
                          position: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={exp.startDate || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...exp,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="month"
                        value={exp.endDate || ""}
                        onChange={(e) =>
                          handleArrayUpdate("", index, {
                            ...exp,
                            endDate: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        disabled={exp.current}
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exp.current || false}
                          onChange={(e) =>
                            handleArrayUpdate("", index, {
                              ...exp,
                              current: e.target.checked,
                              endDate: e.target.checked ? "" : exp.endDate,
                            })
                          }
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Current
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...exp,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Remote or City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={exp.description || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...exp,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderEducationEditor = () => {
    const education = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
          <button
            onClick={() =>
              handleArrayAdd("", {
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                current: false,
                gpa: "",
                description: "",
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Education
          </button>
        </div>

        {education.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No education added yet</div>
            <p className="text-sm text-gray-500">
              Add your educational background to showcase your qualifications.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Education #{index + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleArrayMove("", index, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayMove("", index, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === education.length - 1}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayRemove("", index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...edu,
                          institution: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Stanford University"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...edu,
                          degree: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.field || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...edu,
                          field: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GPA
                      </label>
                      <input
                        type="text"
                        value={edu.gpa || ""}
                        onChange={(e) =>
                          handleArrayUpdate("", index, {
                            ...edu,
                            gpa: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="3.8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Scale
                      </label>
                      <select
                        value={edu.gpaScale || "4.0"}
                        onChange={(e) =>
                          handleArrayUpdate("", index, {
                            ...edu,
                            gpaScale: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="4.0">4.0 Scale</option>
                        <option value="5.0">5.0 Scale</option>
                        <option value="10.0">10.0 Scale</option>
                        <option value="100">Percentage</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={edu.startDate || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...edu,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="month"
                        value={edu.endDate || ""}
                        onChange={(e) =>
                          handleArrayUpdate("", index, {
                            ...edu,
                            endDate: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        disabled={edu.current}
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={edu.current || false}
                          onChange={(e) =>
                            handleArrayUpdate("", index, {
                              ...edu,
                              current: e.target.checked,
                              endDate: e.target.checked ? "" : edu.endDate,
                            })
                          }
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Current
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={edu.description || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...edu,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Relevant coursework, honors, or achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSkillsEditor = () => {
  // Handle the actual data structure
  const skillsData = data || {};
  
  // Extract all skills from different categories
  const allSkills = [
    ...(skillsData.technical || []).map((skill: any) => ({ ...skill, category: 'technical' })),
    ...(skillsData.soft || []).map((skill: any) => ({ 
      name: skill,
      level: 'intermediate',
      category: 'soft' 
    })),
    ...(skillsData.languages || []).map((lang: any) => ({ 
      name: lang.language,
      level: lang.proficiency,
      category: 'language' 
    }))
  ];

  console.log('All skills:', allSkills);
  console.log('Skills data:', skillsData);

  // Function to handle skill updates in the proper structure
  const handleSkillUpdate = (index: number, updatedSkill: any) => {
    // Find which category this skill belongs to
    const category = updatedSkill.category || 'technical';
    
    // Get current skills for this category
    const currentCategorySkills = [...(skillsData[category] || [])];
    
    // Find the original index in the category array
    // Since allSkills is a flat array, we need to map back to original structure
    
    // For now, let's rebuild the entire skills object
    const updatedSkills = { ...skillsData };
    
    if (!updatedSkills.technical) updatedSkills.technical = [];
    if (!updatedSkills.soft) updatedSkills.soft = [];
    if (!updatedSkills.languages) updatedSkills.languages = [];
    
    // Clear all categories first
    updatedSkills.technical = [];
    updatedSkills.soft = [];
    updatedSkills.languages = [];
    
    // Rebuild from allSkills array
    allSkills.forEach((skill, i) => {
      if (i === index) {
        skill = updatedSkill;
      }
      
      // Convert back to proper format for each category
      if (skill.category === 'technical') {
        updatedSkills.technical.push({
          name: skill.name,
          level: skill.level,
          category: skill.category
        });
      } else if (skill.category === 'soft') {
        // For soft skills, just store the name as string
        updatedSkills.soft.push(skill.name);
      } else if (skill.category === 'language') {
        updatedSkills.languages.push({
          language: skill.name,
          proficiency: skill.level
        });
      }
    });
    
    // Update the local data
    setLocalData(updatedSkills);
    onUpdate(updatedSkills);
  };

  // Function to add a new skill
  const handleAddSkill = () => {
    const newSkill = {
      name: '',
      level: 'intermediate',
      category: 'technical'
    };
    
    const updatedSkills = { ...skillsData };
    if (!updatedSkills.technical) updatedSkills.technical = [];
    updatedSkills.technical.push(newSkill);
    
    setLocalData(updatedSkills);
    onUpdate(updatedSkills);
  };

  // Function to remove a skill
  const handleRemoveSkill = (index: number) => {
    // Rebuild the skills object without the item at the given index
    const updatedSkills = { ...skillsData };
    
    // Clear categories
    updatedSkills.technical = [];
    updatedSkills.soft = [];
    updatedSkills.languages = [];
    
    // Rebuild without the removed item
    allSkills.forEach((skill, i) => {
      if (i !== index) {
        if (skill.category === 'technical') {
          if (!updatedSkills.technical) updatedSkills.technical = [];
          updatedSkills.technical.push({
            name: skill.name,
            level: skill.level,
            category: skill.category
          });
        } else if (skill.category === 'soft') {
          if (!updatedSkills.soft) updatedSkills.soft = [];
          updatedSkills.soft.push(skill.name);
        } else if (skill.category === 'language') {
          if (!updatedSkills.languages) updatedSkills.languages = [];
          updatedSkills.languages.push({
            language: skill.name,
            proficiency: skill.level
          });
        }
      }
    });
    
    setLocalData(updatedSkills);
    onUpdate(updatedSkills);
  };

  // Function to move skill up/down
  const handleMoveSkill = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === allSkills.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedSkills = { ...skillsData };
    
    // Create a copy of allSkills
    const reorderedSkills = [...allSkills];
    [reorderedSkills[index], reorderedSkills[newIndex]] = [reorderedSkills[newIndex], reorderedSkills[index]];
    
    // Rebuild categories from reordered array
    updatedSkills.technical = [];
    updatedSkills.soft = [];
    updatedSkills.languages = [];
    
    reorderedSkills.forEach((skill) => {
      if (skill.category === 'technical') {
        updatedSkills.technical.push({
          name: skill.name,
          level: skill.level,
          category: skill.category
        });
      } else if (skill.category === 'soft') {
        if (!updatedSkills.soft) updatedSkills.soft = [];
        updatedSkills.soft.push(skill.name);
      } else if (skill.category === 'language') {
        if (!updatedSkills.languages) updatedSkills.languages = [];
        updatedSkills.languages.push({
          language: skill.name,
          proficiency: skill.level
        });
      }
    });
    
    setLocalData(updatedSkills);
    onUpdate(updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <div className="flex gap-2">
          <button
            onClick={handleAddSkill}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Technical Skill
          </button>
          <button
            onClick={() => {
              const updatedSkills = { ...skillsData };
              if (!updatedSkills.soft) updatedSkills.soft = [];
              updatedSkills.soft.push('');
              setLocalData(updatedSkills);
              onUpdate(updatedSkills);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Soft Skill
          </button>
          <button
            onClick={() => {
              const updatedSkills = { ...skillsData };
              if (!updatedSkills.languages) updatedSkills.languages = [];
              updatedSkills.languages.push({
                language: '',
                proficiency: 'intermediate'
              });
              setLocalData(updatedSkills);
              onUpdate(updatedSkills);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Language
          </button>
        </div>
      </div>

      {allSkills.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No skills added yet</div>
          <p className="text-sm text-gray-500">
            Add your skills to showcase your capabilities.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allSkills.map((skill: any, index: number) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-lg p-6 ${
                skill.category === 'technical' ? 'border-l-4 border-l-blue-500' :
                skill.category === 'soft' ? 'border-l-4 border-l-green-500' :
                'border-l-4 border-l-purple-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-900">Skill #{index + 1}</h4>
                  <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                    skill.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                    skill.category === 'soft' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {skill.category === 'technical' ? 'Technical' :
                     skill.category === 'soft' ? 'Soft Skill' : 'Language'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleMoveSkill(index, 'up')}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    disabled={index === 0}
                  >
                    <ChevronUpIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleMoveSkill(index, 'down')}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    disabled={index === allSkills.length - 1}
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {skill.category === 'soft' ? (
                // Simple input for soft skills (just text)
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) => handleSkillUpdate(index, { 
                      ...skill, 
                      name: e.target.value 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Communication, Leadership, etc."
                  />
                </div>
              ) : (
                // Full form for technical skills and languages
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {skill.category === 'language' ? 'Language' : 'Skill Name'}
                      </label>
                      <input
                        type="text"
                        value={skill.name || ''}
                        onChange={(e) => handleSkillUpdate(index, { 
                          ...skill, 
                          name: e.target.value 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder={skill.category === 'language' ? 'English' : 'JavaScript'}
                      />
                    </div>
                    
                    {skill.category === 'language' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Proficiency
                        </label>
                        <select
                          value={skill.level || 'intermediate'}
                          onChange={(e) => handleSkillUpdate(index, { 
                            ...skill, 
                            level: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="basic">Basic</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="native">Native</option>
                          <option value="fluent">Fluent</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={skill.category || 'technical'}
                          onChange={(e) => handleSkillUpdate(index, { 
                            ...skill, 
                            category: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="technical">Technical</option>
                          <option value="tool">Tools & Software</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {skill.category !== 'language' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Proficiency Level
                      </label>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-4">
                          {["beginner", "intermediate", "advanced", "expert"].map(
                            (level) => (
                              <label key={level} className="flex items-center">
                                <input
                                  type="radio"
                                  checked={skill.level === level}
                                  onChange={() =>
                                    handleSkillUpdate(index, {
                                      ...skill,
                                      level,
                                    })
                                  }
                                  className="h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                  {level}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Category Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Technical Skills</h4>
              <p className="text-2xl font-bold text-blue-700">{skillsData.technical?.length || 0}</p>
            </div>
            <CodeBracketIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-green-900">Soft Skills</h4>
              <p className="text-2xl font-bold text-green-700">{skillsData.soft?.length || 0}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-purple-900">Languages</h4>
              <p className="text-2xl font-bold text-purple-700">{skillsData.languages?.length || 0}</p>
            </div>
            <GlobeAltIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

  const renderProjectsEditor = () => {
    const projects = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Projects</h3>
          <button
            onClick={() =>
              handleArrayAdd("", {
                name: "",
                description: "",
                technologies: [],
                link: "",
                startDate: "",
                endDate: "",
                current: false,
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No projects added yet</div>
            <p className="text-sm text-gray-500">
              Add your projects to showcase your practical experience.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Project #{index + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleArrayMove("", index, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayMove("", index, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === projects.length - 1}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayRemove("", index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...project,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="E-commerce Platform"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={project.startDate || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...project,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="month"
                        value={project.endDate || ""}
                        onChange={(e) =>
                          handleArrayUpdate("", index, {
                            ...project,
                            endDate: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        disabled={project.current}
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={project.current || false}
                          onChange={(e) =>
                            handleArrayUpdate("", index, {
                              ...project,
                              current: e.target.checked,
                              endDate: e.target.checked ? "" : project.endDate,
                            })
                          }
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Ongoing
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={project.link || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...project,
                        link: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(project.technologies)
                        ? project.technologies.join(", ")
                        : ""
                    }
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...project,
                        technologies: e.target.value
                          .split(",")
                          .map((tech: string) => tech.trim()),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="React, Node.js, MongoDB, AWS"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate technologies with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={project.description || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...project,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Describe the project, your role, and key achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCertificationsEditor = () => {
    const certifications = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
          <button
            onClick={() =>
              handleArrayAdd("", {
                name: "",
                issuer: "",
                issueDate: "",
                expiryDate: "",
                credentialId: "",
                link: "",
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Certification
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              No certifications added yet
            </div>
            <p className="text-sm text-gray-500">
              Add your professional certifications.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Certification #{index + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleArrayMove("", index, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayMove("", index, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === certifications.length - 1}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayRemove("", index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      value={cert.name || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...cert,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={cert.issuer || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...cert,
                          issuer: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Date
                    </label>
                    <input
                      type="month"
                      value={cert.issueDate || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...cert,
                          issueDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="month"
                      value={cert.expiryDate || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...cert,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Credential ID
                    </label>
                    <input
                      type="text"
                      value={cert.credentialId || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...cert,
                          credentialId: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="AWS-12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Link
                    </label>
                    <input
                      type="url"
                      value={cert.link || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...cert,
                          link: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="https://www.credly.com/badges/12345"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSocialLinksEditor = () => {
    const socialLinks = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
          <button
            onClick={() =>
              handleArrayAdd("", {
                platform: "",
                url: "",
                username: "",
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Social Link
          </button>
        </div>

        {socialLinks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No social links added yet</div>
            <p className="text-sm text-gray-500">
              Add your social media profiles and online presence.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {socialLinks.map((link: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Link #{index + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleArrayMove("", index, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayMove("", index, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === socialLinks.length - 1}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayRemove("", index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <select
                    value={link.platform || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...link,
                        platform: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Platform</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="github">GitHub</option>
                    <option value="twitter">Twitter</option>
                    <option value="personal">Personal Website</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="blog">Blog</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {link.platform === "other" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Platform Name
                    </label>
                    <input
                      type="text"
                      value={link.customPlatform || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...link,
                          customPlatform: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Stack Overflow, Dev.to, etc."
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username/Handle
                  </label>
                  <input
                    type="text"
                    value={link.username || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...link,
                        username: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="john-doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={link.url || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...link,
                        url: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://linkedin.com/in/john-doe"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAchievementsEditor = () => {
    const achievements = Array.isArray(data) ? data : [];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Achievements & Awards
          </h3>
          <button
            onClick={() =>
              handleArrayAdd("", {
                title: "",
                issuer: "",
                date: "",
                description: "",
              })
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Achievement
          </button>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No achievements added yet</div>
            <p className="text-sm text-gray-500">
              Add your achievements, awards, and recognitions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.map((achievement: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Achievement #{index + 1}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleArrayMove("", index, "up")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayMove("", index, "down")}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === achievements.length - 1}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleArrayRemove("", index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={achievement.title || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...achievement,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Employee of the Month"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={achievement.issuer || ""}
                      onChange={(e) =>
                        handleArrayUpdate("", index, {
                          ...achievement,
                          issuer: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Google Inc."
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Received
                  </label>
                  <input
                    type="month"
                    value={achievement.date || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...achievement,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={achievement.description || ""}
                    onChange={(e) =>
                      handleArrayUpdate("", index, {
                        ...achievement,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Describe the achievement and its significance..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderGenericEditor = () => (
    <div className="space-y-4">
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          No editor available for this section
        </div>
        <p className="text-sm text-gray-500">
          This section type is not supported in the editor.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {section} Editor
        </h2>
        <p className="text-gray-600 mt-2">
          Edit your {section.replace("_", " ")} information
        </p>
      </div>

      {renderSectionEditor()}
    </div>
  );
}
