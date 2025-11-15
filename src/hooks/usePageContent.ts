import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

export interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  content_type: string;
  content_pt: string;
  content_en: string;
}

export const usePageContent = (pageKey: string) => {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    loadContent();
  }, [pageKey]);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_contents')
        .select('*')
        .eq('page_key', pageKey)
        .order('section_key');

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error loading page content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (sectionKey: string, defaultValue: string = '') => {
    const content = contents.find(c => c.section_key === sectionKey);
    if (!content) return defaultValue;
    return language === 'pt' ? content.content_pt : content.content_en;
  };

  const getContentType = (sectionKey: string) => {
    const content = contents.find(c => c.section_key === sectionKey);
    return content?.content_type || 'text';
  };

  return { contents, loading, getContent, getContentType };
};
